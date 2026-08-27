import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import * as governance from "./validate-agent-governance.mjs";

const { validateGovernance } = governance;

const requiredFiles = [
  ".agent/governance/INVARIANTS.md",
  ".agent/governance/authority-matrix.md",
  ".agent/governance/documentation-policy.md",
  ".agent/governance/review-policy.md",
];

async function createGovernanceFixture({ omit } = {}) {
  const root = await mkdtemp(path.join(tmpdir(), "planote-governance-"));

  for (const relativePath of requiredFiles) {
    if (relativePath === omit) continue;
    const filePath = path.join(root, relativePath);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, "# Governance\n", "utf8");
  }

  return root;
}

async function createRepositoryFixture({ omit, tasks = [], taskRecords = {} } = {}) {
  const root = await createGovernanceFixture();
  const routingPrompt =
    "Documentation evidence acceptance criteria authority boundaries gpt-5.6-terra / ultra gpt-5.6-terra / high gpt-5.6-luna / medium routine verification. Prioritize actual code implementation and product development. Select the highest-priority ready acceptance criterion, one user-visible outcome, and a small allowed file set with explicit dependencies and a clear verification stop condition. Do not replan the entire project. Defer mobile, billing, and AI.\n";
  const masterDeliveryPrompt =
    `${routingPrompt}Run a 90-minute delivery sprint: 10 minutes for reconcile and plan, 45 minutes for implementation, 20 minutes for independent review and P0/P1 follow-up, and 15 minutes for verification and reporting. Start no new work after the 90-minute deadline. Use no more than two independent implementation subagents and deliver one small user-visible release-candidate outcome per sprint. Complete a provider readiness preflight before Clerk, database, storage, or external work. Report release-candidate verified, implemented-but-unverified, remaining, and deferred status in plain English under three minutes, including implementation progress, blockers, next action, and How to test locally. Use the exact heading Onkar We need your help only when an owner-controlled external dependency needs action.\n`;
  const completeSkill = `# Skill
## Purpose
## Trigger conditions
## Non-goals
## Inputs
## Workflow
## Safety boundaries
## Output format
## Repository examples
## Verification
## Version
## Owner
## Review date
## Deprecation path
`;
  const files = {
    ".agent/acceptance/registry.yaml": `schemaVersion: 1
criteria:
  - id: AC-AUTH-01
    feature: Email sign-up
    priority: launch-blocker
    status: not-started
    verification: [web-test]
    evidence: []
`,
    ".agent/delivery-ledger.yaml": `schemaVersion: 1
updatedAt: "2026-08-26T00:00:00.000Z"
milestones: []
tasks:${tasks
      .map(
        (task) => `
  - id: ${task.id}
    status: ${task.status ?? "review"}
    acceptance: [${(task.acceptance ?? []).join(", ")}]
    record: ${task.record}`,
      )
      .join("") || " []"}
`,
    ".agent/templates/task.md": "# Task template\n",
    ".agent/templates/code-review.md": "# Review template\n",
    ".agent/templates/adr.md": "# ADR template\n",
    ".agent/templates/progress-report.md": "# Progress template\n",
    ".agent/templates/agent-handoff.md": "# Handoff template\n",
    ".agent/prompts/master-delivery-agent.md": masterDeliveryPrompt,
    ".agent/prompts/implementation-agent.md": routingPrompt,
    ".agent/prompts/code-reviewer-agent.md": routingPrompt,
    ".agent/prompts/security-reviewer-agent.md": routingPrompt,
    ".agent/skills/SKILL_TEMPLATE.md": completeSkill,
    ".agent/skills/promoted/task-delegation.md": completeSkill,
    ".agent/skills/promoted/acceptance-criteria-review.md": completeSkill,
    ".agent/skills/promoted/code-review.md": completeSkill,
    ".agent/skills/promoted/release-verification.md": completeSkill,
    ".agent/skills/draft/.gitkeep": "",
    ".agent/skills/validated/.gitkeep": "",
    ".agent/automations/master-delivery-controller.json": JSON.stringify({
      name: "Planote Master Delivery Controller",
      cadenceHours: 3,
      timezone: "Europe/London",
      mode: "dry-run-first",
      promptFile: ".agent/prompts/master-delivery-agent.md",
      reportDirectory: ".agent/reports/automation-runs",
      sprintBudgetMinutes: 90,
      maxImplementationAgents: 2,
      reportReadLimitMinutes: 3,
    }),
    ".agent/automations/master-delivery-controller.md": "# Automation setup\n",
    ".agent/reports/automation-runs/.gitkeep": "",
  };

  for (const [relativePath, content] of Object.entries(files)) {
    if (relativePath === omit) continue;
    const filePath = path.join(root, relativePath);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, content, "utf8");
  }

  for (const [relativePath, content] of Object.entries(taskRecords)) {
    const filePath = path.join(root, relativePath);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, content, "utf8");
  }

  return root;
}

const fixtureTask = {
  id: "TASK-001",
  status: "review",
  acceptance: ["AC-AUTH-01"],
  record: ".agent/tasks/TASK-001-fixture.md",
};

const validTaskRecord = `# TASK-001 — Fixture task

- Status: review
- Acceptance criteria: AC-AUTH-01
- Model/effort: gpt-5.6-terra / high
- Complexity rationale: A focused lifecycle validation fixture.
- Escalation: none
`;

test("rejects a missing required governance file", async (t) => {
  const root = await createGovernanceFixture({
    omit: ".agent/governance/INVARIANTS.md",
  });
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.rejects(
    () => validateGovernance({ root }),
    /Missing required governance file: \.agent\/governance\/INVARIANTS\.md/,
  );
});

test("accepts a complete governance file set", async (t) => {
  const root = await createGovernanceFixture();
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.doesNotReject(() => validateGovernance({ root }));
});

test("rejects a directory where a required governance file belongs", async (t) => {
  const relativePath = ".agent/governance/review-policy.md";
  const root = await createGovernanceFixture({ omit: relativePath });
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, relativePath), { recursive: true });

  await assert.rejects(
    () => validateGovernance({ root }),
    /Missing required governance file: \.agent\/governance\/review-policy\.md/,
  );
});

test("exports acceptance-registry and delivery-ledger validators", () => {
  assert.equal(typeof governance.validateAcceptanceRegistry, "function");
  assert.equal(typeof governance.validateLedger, "function");
  assert.equal(typeof governance.validateRepository, "function");
  assert.equal(typeof governance.validateTaskRecord, "function");
  assert.equal(typeof governance.validatePrompt, "function");
  assert.equal(typeof governance.validateSkill, "function");
  assert.equal(typeof governance.validateAutomation, "function");
});

const validRegistry = {
  schemaVersion: 1,
  criteria: [
    {
      id: "AC-AUTH-01",
      feature: "Email sign-up",
      priority: "launch-blocker",
      status: "not-started",
      verification: ["web-test", "real-clerk-smoke"],
      evidence: [],
    },
  ],
};

test("rejects malformed and duplicate acceptance criterion IDs", () => {
  assert.throws(
    () => governance.validateAcceptanceRegistry({ criteria: [{ id: "AUTH-03" }] }),
    /Acceptance criterion IDs must match AC-\[A-Z\]\+-\[0-9\]\{2\}/,
  );
  assert.throws(
    () =>
      governance.validateAcceptanceRegistry({
        criteria: [validRegistry.criteria[0], validRegistry.criteria[0]],
      }),
    /Duplicate acceptance criterion: AC-AUTH-01/,
  );
});

test("rejects acceptance states outside the approved design", () => {
  assert.throws(
    () =>
      governance.validateAcceptanceRegistry({
        criteria: [{ ...validRegistry.criteria[0], status: "partially-implemented" }],
      }),
    /Invalid acceptance status: partially-implemented/,
  );
});

test("rejects ledger tasks linked to unknown acceptance criteria", () => {
  assert.throws(
    () =>
      governance.validateLedger(
        {
          schemaVersion: 1,
          milestones: [],
          tasks: [{ id: "TASK-003", status: "planned", acceptance: ["AC-MISSING-01"] }],
        },
        validRegistry,
      ),
    /Unknown acceptance criterion: AC-MISSING-01/,
  );
});

test("requires test, build, and approved-review evidence for verified tasks", () => {
  assert.throws(
    () =>
      governance.validateLedger(
        {
          schemaVersion: 1,
          milestones: [],
          tasks: [{ id: "TASK-003", status: "verified", acceptance: ["AC-AUTH-01"] }],
        },
        validRegistry,
      ),
    /Verified task TASK-003 requires test, build, and approved review evidence/,
  );
});

test("rejects a completed task record without lifecycle evidence", () => {
  assert.throws(
    () => governance.validateTaskRecord("# TASK-001\n- Status: complete\n"),
    /Completed task record is missing: .*Evidence.*Review result.*Decisions and handoff/,
  );
});

test("accepts an active record and a complete record with all required headings", () => {
  assert.doesNotThrow(() => governance.validateTaskRecord("# TASK-001\n- Status: active\n"));
  const complete = `# TASK-001
- Status: verified

## Scope
## Forbidden actions
## Assumptions
## Prompt issued
## Actions log
## Files changed
## Evidence
## Review result
## Decisions and handoff
## Git result
`;
  assert.doesNotThrow(() => governance.validateTaskRecord(complete));
});

test("rejects prompts that omit governance control terms", () => {
  assert.throws(
    () => governance.validatePrompt("master-delivery-agent.md", "You are a master agent"),
    /Prompt must require documentation, evidence, acceptance criteria, and authority boundaries/,
  );
});

test("accepts a prompt with the generic governance controls", () => {
  assert.doesNotThrow(() =>
    governance.validatePrompt(
      "role.md",
      "Document documentation. Require evidence and acceptance criteria. Respect authority boundaries. gpt-5.6-terra / ultra gpt-5.6-terra / high gpt-5.6-luna / medium routine verification.",
    ),
  );
});

test("rejects a Master prompt without product-first planning controls", () => {
  assert.throws(
    () =>
      governance.validatePrompt(
        "master-delivery-agent.md",
        "Document documentation. Require evidence and acceptance criteria. Respect authority boundaries. gpt-5.6-terra / ultra gpt-5.6-terra / high gpt-5.6-luna / medium routine verification.",
      ),
    /Master prompt must require product-first planning controls/,
  );
});

test("rejects a Master prompt without explicit dependencies", () => {
  assert.throws(
    () =>
      governance.validatePrompt(
        "master-delivery-agent.md",
        "Documentation evidence acceptance criteria authority boundaries gpt-5.6-terra / ultra gpt-5.6-terra / high gpt-5.6-luna / medium routine verification. Prioritize actual code implementation and product development. Select the highest-priority ready acceptance criterion, one user-visible outcome, and a small allowed file set. Do not replan the entire project. Defer mobile, billing, and AI. Include a clear verification stop condition.",
      ),
    /Master prompt must require product-first planning controls/,
  );
});

test("rejects a Master prompt without a verification stop condition", () => {
  assert.throws(
    () =>
      governance.validatePrompt(
        "master-delivery-agent.md",
        "Documentation evidence acceptance criteria authority boundaries gpt-5.6-terra / ultra gpt-5.6-terra / high gpt-5.6-luna / medium routine verification. Prioritize actual code implementation and product development. Select the highest-priority ready acceptance criterion, one user-visible outcome, and a small allowed file set. Do not replan the entire project. Defer mobile, billing, and AI. Include explicit dependencies.",
      ),
    /Master prompt must require product-first planning controls/,
  );
});

test("rejects a Master prompt without the 90-minute delivery sprint contract", () => {
  assert.throws(
    () =>
      governance.validatePrompt(
        "master-delivery-agent.md",
        "Documentation evidence acceptance criteria authority boundaries gpt-5.6-terra / ultra gpt-5.6-terra / high gpt-5.6-luna / medium routine verification. Prioritize actual code implementation and product development. Select the highest-priority ready acceptance criterion, one user-visible outcome, and a small allowed file set with explicit dependencies and a clear verification stop condition. Do not replan the entire project. Defer mobile, billing, and AI.",
      ),
    /Master prompt must require the 90-minute delivery sprint contract/,
  );
});

test("accepts a line-wrapped complete 90-minute delivery sprint contract", () => {
  assert.doesNotThrow(() =>
    governance.validatePrompt(
      "master-delivery-agent.md",
      "Documentation evidence acceptance criteria authority boundaries gpt-5.6-terra / ultra gpt-5.6-terra / high gpt-5.6-luna / medium routine verification. Prioritize actual code implementation and product development. Select the highest-priority ready acceptance criterion, one user-visible outcome, and a small allowed file set with explicit dependencies and a clear verification stop condition. Do not replan the entire project. Defer mobile, billing, and AI. Run a 90-minute delivery sprint: spend 10 minutes to reconcile and plan, 45 minutes on implementation, 20 minutes on independent review and P0/P1 follow-up, and 15 minutes on verification and reporting. Start no new work after the 90-minute deadline. Use no more than two independent implementation subagents and deliver one small user-visible\nrelease-candidate outcome per sprint. Perform a provider readiness preflight before Clerk, database, storage, or other\nexternal work. Report release-candidate verified, implemented-but-unverified, remaining, and deferred status in plain English under three minutes, including implementation progress, blockers, next action, and How to test locally. Use the exact heading Onkar We need your help only when an owner-controlled external dependency needs action.",
    ),
  );
});

test("requires Terra planning and implementation routing plus Luna routine verification", () => {
  assert.throws(
    () =>
      governance.validatePrompt(
        "role.md",
        "Documentation evidence acceptance criteria authority boundaries gpt-5.6-terra high",
      ),
    /Prompt must require Terra ultra planning, Terra high implementation, and Luna medium routine verification/,
  );
});

test("rejects role prompts that route work to the retired Sol model", () => {
  assert.throws(
    () =>
      governance.validatePrompt(
        "master-delivery-agent.md",
        "Documentation evidence acceptance criteria authority boundaries gpt-5.6-terra / ultra gpt-5.6-terra / high gpt-5.6-luna / medium routine verification gpt-5.6-sol",
      ),
    /Prompt must not route work to gpt-5\.6-sol/,
  );
});

test("rejects reusable skills with missing lifecycle metadata", () => {
  assert.throws(
    () => governance.validateSkill("# Skill\n\nDo reviews."),
    /Skill is missing: .*Trigger conditions.*Safety boundaries.*Verification.*Version.*Review date/,
  );
});

test("accepts a reusable skill with complete lifecycle metadata", () => {
  const skill = `# Skill
## Purpose
## Trigger conditions
## Non-goals
## Inputs
## Workflow
## Safety boundaries
## Output format
## Repository examples
## Verification
## Version
## Owner
## Review date
## Deprecation path
`;
  assert.doesNotThrow(() => governance.validateSkill(skill));
});

test("rejects automation configurations outside the approved cadence and timezone", () => {
  assert.throws(
    () => governance.validateAutomation({ cadenceHours: 1, timezone: "UTC" }),
    /Automation must run every 3 hours in Europe\/London/,
  );
});

test("accepts the exact dry-run-first automation configuration", () => {
  assert.doesNotThrow(() =>
    governance.validateAutomation({
      name: "Planote Master Delivery Controller",
      cadenceHours: 3,
      timezone: "Europe/London",
      mode: "dry-run-first",
      promptFile: ".agent/prompts/master-delivery-agent.md",
      reportDirectory: ".agent/reports/automation-runs",
      sprintBudgetMinutes: 90,
      maxImplementationAgents: 2,
      reportReadLimitMinutes: 3,
    }),
  );
});

test("rejects automation configurations without sprint reporting limits", () => {
  assert.throws(
    () =>
      governance.validateAutomation({
        name: "Planote Master Delivery Controller",
        cadenceHours: 3,
        timezone: "Europe/London",
        mode: "dry-run-first",
        promptFile: ".agent/prompts/master-delivery-agent.md",
        reportDirectory: ".agent/reports/automation-runs",
      }),
    /Automation must preserve the sprint budget, implementation-agent limit, and report read limit/,
  );
});

test("repository validation requires the acceptance registry and delivery ledger", async (t) => {
  const root = await createRepositoryFixture({ omit: ".agent/acceptance/registry.yaml" });
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.rejects(
    () => governance.validateRepository({ root }),
    /Missing required agent file: \.agent\/acceptance\/registry\.yaml/,
  );
});

test("repository validation parses and validates registry and ledger YAML", async (t) => {
  const root = await createRepositoryFixture();
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.doesNotReject(() => governance.validateRepository({ root }));
});

test("repository validation rejects a ledger task whose record is missing", async (t) => {
  const root = await createRepositoryFixture({ tasks: [fixtureTask] });
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.rejects(
    () => governance.validateRepository({ root }),
    /Missing task record for TASK-001: \.agent\/tasks\/TASK-001-fixture\.md/,
  );
});

test("repository validation rejects a task record whose header ID differs from its ledger ID", async (t) => {
  const root = await createRepositoryFixture({
    tasks: [fixtureTask],
    taskRecords: {
      [fixtureTask.record]: validTaskRecord.replace("# TASK-001", "# TASK-999"),
    },
  });
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.rejects(
    () => governance.validateRepository({ root }),
    /Task record ID mismatch for TASK-001: found TASK-999/,
  );
});

test("repository validation rejects a task record whose acceptance IDs differ from its ledger entry", async (t) => {
  const root = await createRepositoryFixture({
    tasks: [fixtureTask],
    taskRecords: {
      [fixtureTask.record]: validTaskRecord.replace("AC-AUTH-01", "AC-GOV-03"),
    },
  });
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.rejects(
    () => governance.validateRepository({ root }),
    /Task record acceptance mismatch for TASK-001/,
  );
});

test("repository validation requires every task record to declare escalation metadata", async (t) => {
  const root = await createRepositoryFixture({
    tasks: [fixtureTask],
    taskRecords: {
      [fixtureTask.record]: validTaskRecord.replace("- Escalation: none\n", ""),
    },
  });
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.rejects(
    () => governance.validateRepository({ root }),
    /Task record TASK-001 is missing required metadata: Escalation/,
  );
});

test("repository validation rejects generic model identifiers in task records", async (t) => {
  const root = await createRepositoryFixture({
    tasks: [fixtureTask],
    taskRecords: {
      [fixtureTask.record]: validTaskRecord.replace(
        "gpt-5.6-terra / high",
        "current Codex implementation session / high",
      ),
    },
  });
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.rejects(
    () => governance.validateRepository({ root }),
    /Task record TASK-001 has an unsupported Model\/effort value: current Codex implementation session \/ high/,
  );
});

test("repository validation requires every lifecycle template", async (t) => {
  const root = await createRepositoryFixture({ omit: ".agent/templates/task.md" });
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.rejects(
    () => governance.validateRepository({ root }),
    /Missing required agent file: \.agent\/templates\/task\.md/,
  );
});

test("repository validation requires every role prompt", async (t) => {
  const root = await createRepositoryFixture({
    omit: ".agent/prompts/master-delivery-agent.md",
  });
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.rejects(
    () => governance.validateRepository({ root }),
    /Missing required agent file: \.agent\/prompts\/master-delivery-agent\.md/,
  );
});

test("repository validation requires promoted skills and lifecycle directories", async (t) => {
  const root = await createRepositoryFixture({
    omit: ".agent/skills/promoted/code-review.md",
  });
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.rejects(
    () => governance.validateRepository({ root }),
    /Missing required agent file: \.agent\/skills\/promoted\/code-review\.md/,
  );
});

test("repository validation requires and parses the automation manifest", async (t) => {
  const root = await createRepositoryFixture({
    omit: ".agent/automations/master-delivery-controller.json",
  });
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.rejects(
    () => governance.validateRepository({ root }),
    /Missing required agent file: \.agent\/automations\/master-delivery-controller\.json/,
  );
});
