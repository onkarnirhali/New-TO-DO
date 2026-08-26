import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { parse } from "yaml";

export const REQUIRED_GOVERNANCE_FILES = [
  ".agent/governance/INVARIANTS.md",
  ".agent/governance/authority-matrix.md",
  ".agent/governance/documentation-policy.md",
  ".agent/governance/review-policy.md",
];

export const REQUIRED_TEMPLATE_FILES = [
  ".agent/templates/task.md",
  ".agent/templates/code-review.md",
  ".agent/templates/adr.md",
  ".agent/templates/progress-report.md",
  ".agent/templates/agent-handoff.md",
];

export const REQUIRED_PROMPT_FILES = [
  ".agent/prompts/master-delivery-agent.md",
  ".agent/prompts/implementation-agent.md",
  ".agent/prompts/code-reviewer-agent.md",
  ".agent/prompts/security-reviewer-agent.md",
];

export const REQUIRED_SKILL_FILES = [
  ".agent/skills/SKILL_TEMPLATE.md",
  ".agent/skills/promoted/task-delegation.md",
  ".agent/skills/promoted/acceptance-criteria-review.md",
  ".agent/skills/promoted/code-review.md",
  ".agent/skills/promoted/release-verification.md",
  ".agent/skills/draft/.gitkeep",
  ".agent/skills/validated/.gitkeep",
];

export const REQUIRED_AUTOMATION_FILES = [
  ".agent/automations/master-delivery-controller.md",
  ".agent/automations/master-delivery-controller.json",
  ".agent/reports/automation-runs/.gitkeep",
];

export async function validateGovernance({ root }) {
  for (const relativePath of REQUIRED_GOVERNANCE_FILES) {
    try {
      const file = await stat(path.join(root, relativePath));
      if (!file.isFile()) throw new Error("Required path is not a file");
    } catch {
      throw new Error(`Missing required governance file: ${relativePath}`);
    }
  }
}

export const ACCEPTANCE_STATUSES = new Set([
  "not-started",
  "planned",
  "active",
  "implemented",
  "review",
  "verified",
  "blocked",
  "deferred",
]);

export const TASK_STATUSES = new Set([
  "planned",
  "active",
  "review",
  "blocked",
  "implemented",
  "verified",
  "rejected",
  "deferred",
]);

export function validateAcceptanceRegistry(registry) {
  const criteria = registry?.criteria;
  if (!Array.isArray(criteria)) throw new Error("Acceptance registry must contain criteria");

  const ids = new Set();
  for (const criterion of criteria) {
    if (!/^AC-[A-Z]+(?:-[A-Z]+)*-[0-9]{2}$/.test(criterion?.id ?? "")) {
      throw new Error("Acceptance criterion IDs must match AC-[A-Z]+-[0-9]{2}");
    }
    if (ids.has(criterion.id)) throw new Error(`Duplicate acceptance criterion: ${criterion.id}`);
    ids.add(criterion.id);

    if (!ACCEPTANCE_STATUSES.has(criterion.status)) {
      throw new Error(`Invalid acceptance status: ${criterion.status}`);
    }
  }
  return registry;
}

export function validateLedger(ledger, registry) {
  const tasks = ledger?.tasks;
  if (!Array.isArray(tasks)) throw new Error("Delivery ledger must contain tasks");

  const acceptanceIds = new Set((registry?.criteria ?? []).map(({ id }) => id));
  const taskIds = new Set();
  for (const task of tasks) {
    if (!/^TASK-[0-9]{3}$/.test(task?.id ?? "")) {
      throw new Error(`Invalid task ID: ${task?.id}`);
    }
    if (taskIds.has(task.id)) throw new Error(`Duplicate task: ${task.id}`);
    taskIds.add(task.id);
    if (!TASK_STATUSES.has(task.status)) throw new Error(`Invalid task status: ${task.status}`);

    for (const acceptanceId of task.acceptance ?? []) {
      if (!acceptanceIds.has(acceptanceId)) {
        throw new Error(`Unknown acceptance criterion: ${acceptanceId}`);
      }
    }

    if (task.status === "verified") {
      const evidence = task.evidence;
      const complete =
        Array.isArray(evidence?.tests) &&
        evidence.tests.length > 0 &&
        typeof evidence?.build === "string" &&
        evidence.build.length > 0 &&
        evidence?.review?.decision === "approved" &&
        typeof evidence.review.report === "string" &&
        evidence.review.report.length > 0;
      if (!complete) {
        throw new Error(
          `Verified task ${task.id} requires test, build, and approved review evidence`,
        );
      }
    }
  }
  return ledger;
}

export function validateTaskRecord(record) {
  if (!/^- Status: (?:complete|verified)$/m.test(record)) return record;

  const requiredHeadings = [
    "Scope",
    "Forbidden actions",
    "Assumptions",
    "Prompt issued",
    "Actions log",
    "Files changed",
    "Evidence",
    "Review result",
    "Decisions and handoff",
    "Git result",
  ];
  const missing = requiredHeadings.filter(
    (heading) => !new RegExp(`^## ${heading}$`, "mi").test(record),
  );
  if (missing.length > 0) {
    throw new Error(`Completed task record is missing: ${missing.join(", ")}`);
  }
  return record;
}

const HISTORICAL_EVIDENCE_UNAVAILABLE = "historical evidence unavailable";
const SUPPORTED_MODEL_EFFORTS = new Set([
  "gpt-5.6-terra / ultra",
  "gpt-5.6-terra / high",
  "gpt-5.6-luna / medium",
]);

function readTaskRecordMetadata(record, taskId) {
  const header = /^# (TASK-[0-9]{3})\b/m.exec(record);
  if (!header) throw new Error(`Task record ${taskId} is missing its task ID header`);
  if (header[1] !== taskId) {
    throw new Error(`Task record ID mismatch for ${taskId}: found ${header[1]}`);
  }

  const fields = ["Status", "Acceptance criteria", "Model/effort", "Complexity rationale", "Escalation"];
  const metadata = {};
  for (const field of fields) {
    const match = new RegExp(`^- ${field}:\\s*(\\S.*)$`, "mi").exec(record);
    if (!match) {
      throw new Error(`Task record ${taskId} is missing required metadata: ${field}`);
    }
    metadata[field] = match[1].trim();
  }
  return metadata;
}

function validateTaskRecordRoute(metadata, taskId) {
  const route = metadata["Model/effort"];
  const values = [
    metadata["Model/effort"],
    metadata["Complexity rationale"],
    metadata.Escalation,
  ];
  const isHistoricalException = values.every(
    (value) => value === HISTORICAL_EVIDENCE_UNAVAILABLE,
  );

  if (isHistoricalException) return;
  if (values.includes(HISTORICAL_EVIDENCE_UNAVAILABLE)) {
    throw new Error(
      `Task record ${taskId} must use the complete historical-evidence-unavailable form`,
    );
  }
  if (!SUPPORTED_MODEL_EFFORTS.has(route)) {
    throw new Error(`Task record ${taskId} has an unsupported Model/effort value: ${route}`);
  }
}

function validateHistoricalProvenance(record, metadata, taskId) {
  const values = [
    metadata["Model/effort"],
    metadata["Complexity rationale"],
    metadata.Escalation,
  ];
  if (!values.every((value) => value === HISTORICAL_EVIDENCE_UNAVAILABLE)) return;

  const heading = /^## Historical provenance\s*$/mi.exec(record);
  const provenance = heading
    ? record.slice(heading.index + heading[0].length).split(/^## /m, 1)[0]
    : "";
  if (!/\S/.test(provenance)) {
    throw new Error(
      `Task record ${taskId} using historical evidence unavailable requires Historical provenance`,
    );
  }
}

function validateLedgerTaskRecord(task, record) {
  validateTaskRecord(record);
  const metadata = readTaskRecordMetadata(record, task.id);
  if (metadata.Status !== task.status) {
    throw new Error(
      `Task record status mismatch for ${task.id}: ledger ${task.status}, record ${metadata.Status}`,
    );
  }

  const recordAcceptance = metadata["Acceptance criteria"]
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .sort();
  const ledgerAcceptance = [...(task.acceptance ?? [])].sort();
  if (
    recordAcceptance.length !== ledgerAcceptance.length ||
    recordAcceptance.some((id, index) => id !== ledgerAcceptance[index])
  ) {
    throw new Error(`Task record acceptance mismatch for ${task.id}`);
  }

  validateTaskRecordRoute(metadata, task.id);
  validateHistoricalProvenance(record, metadata, task.id);
}

export function validatePrompt(_name, prompt) {
  const required = [/documentation/i, /evidence/i, /acceptance criteria/i, /authority boundaries/i];
  if (required.some((pattern) => !pattern.test(prompt))) {
    throw new Error(
      "Prompt must require documentation, evidence, acceptance criteria, and authority boundaries",
    );
  }
  if (/gpt-5\.6-sol/i.test(prompt)) {
    throw new Error("Prompt must not route work to gpt-5.6-sol");
  }
  const routing = [
    /gpt-5\.6-terra[^\n]{0,80}ultra/i,
    /gpt-5\.6-terra[^\n]{0,80}high/i,
    /gpt-5\.6-luna[^\n]{0,80}medium/i,
    /routine verification/i,
  ];
  if (routing.some((pattern) => !pattern.test(prompt))) {
    throw new Error(
      "Prompt must require Terra ultra planning, Terra high implementation, and Luna medium routine verification",
    );
  }
  return prompt;
}

export function validateSkill(skill) {
  const requiredHeadings = [
    "Purpose",
    "Trigger conditions",
    "Non-goals",
    "Inputs",
    "Workflow",
    "Safety boundaries",
    "Output format",
    "Repository examples",
    "Verification",
    "Version",
    "Owner",
    "Review date",
    "Deprecation path",
  ];
  const missing = requiredHeadings.filter(
    (heading) => !new RegExp(`^## ${heading}$`, "mi").test(skill),
  );
  if (missing.length > 0) throw new Error(`Skill is missing: ${missing.join(", ")}`);
  return skill;
}

export function validateAutomation(automation) {
  const valid =
    automation?.name === "Planote Master Delivery Controller" &&
    automation?.cadenceHours === 3 &&
    automation?.timezone === "Europe/London" &&
    automation?.mode === "dry-run-first" &&
    automation?.promptFile === ".agent/prompts/master-delivery-agent.md" &&
    automation?.reportDirectory === ".agent/reports/automation-runs";
  if (!valid) throw new Error("Automation must run every 3 hours in Europe/London");
  return automation;
}

export async function validateRepository({ root }) {
  await validateGovernance({ root });

  for (const relativePath of REQUIRED_TEMPLATE_FILES) {
    try {
      const file = await stat(path.join(root, relativePath));
      if (!file.isFile()) throw new Error("Required path is not a file");
    } catch {
      throw new Error(`Missing required agent file: ${relativePath}`);
    }
  }

  for (const relativePath of REQUIRED_PROMPT_FILES) {
    let prompt;
    try {
      prompt = await readFile(path.join(root, relativePath), "utf8");
    } catch {
      throw new Error(`Missing required agent file: ${relativePath}`);
    }
    validatePrompt(path.basename(relativePath), prompt);
  }

  for (const relativePath of REQUIRED_SKILL_FILES) {
    let skill;
    try {
      skill = await readFile(path.join(root, relativePath), "utf8");
    } catch {
      throw new Error(`Missing required agent file: ${relativePath}`);
    }
    if (!relativePath.endsWith(".gitkeep")) validateSkill(skill);
  }

  for (const relativePath of REQUIRED_AUTOMATION_FILES) {
    try {
      const file = await stat(path.join(root, relativePath));
      if (!file.isFile()) throw new Error("Required path is not a file");
    } catch {
      throw new Error(`Missing required agent file: ${relativePath}`);
    }
  }

  const automationSource = await readFile(
    path.join(root, ".agent/automations/master-delivery-controller.json"),
    "utf8",
  );
  validateAutomation(JSON.parse(automationSource));

  const registryPath = ".agent/acceptance/registry.yaml";
  const ledgerPath = ".agent/delivery-ledger.yaml";
  let registrySource;
  let ledgerSource;
  try {
    registrySource = await readFile(path.join(root, registryPath), "utf8");
  } catch {
    throw new Error(`Missing required agent file: ${registryPath}`);
  }
  try {
    ledgerSource = await readFile(path.join(root, ledgerPath), "utf8");
  } catch {
    throw new Error(`Missing required agent file: ${ledgerPath}`);
  }

  const registry = validateAcceptanceRegistry(parse(registrySource));
  const ledger = validateLedger(parse(ledgerSource), registry);

  for (const task of ledger.tasks) {
    let record;
    try {
      record = await readFile(path.join(root, task.record), "utf8");
    } catch {
      throw new Error(`Missing task record for ${task.id}: ${task.record}`);
    }
    validateLedgerTaskRecord(task, record);
  }

  return { registry, ledger };
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  try {
    await validateRepository({ root: process.cwd() });
    console.log("Agent governance validation passed.");
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
