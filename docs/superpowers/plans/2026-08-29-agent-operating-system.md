# Planote Agent Operating System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reusable Planote agent contracts, dynamic routing, rolling five-slot scheduling rules, and run metrics to increase coding throughput without weakening delivery controls.

**Architecture:** Extend the existing `.agent` governance system with common role prompts, explicit contracts, policy files, and operational templates. Keep scheduling human/controller-driven for now; the files define enforceable decisions and evidence rather than introducing an autonomous merge service.

**Tech Stack:** Markdown governance records, YAML metrics schema, existing Node-based governance validator, Git worktrees.

---

## Task 1: Common role prompts and model-routing policy

**Files:**
- Create: `.agent/prompts/common/planner-agent.md`
- Create: `.agent/prompts/common/implementation-agent.md`
- Create: `.agent/prompts/common/verification-agent.md`
- Create: `.agent/prompts/common/reviewer-agent.md`
- Create: `.agent/prompts/common/integration-agent.md`
- Create: `.agent/policies/model-routing.md`
- Modify: `.agent/prompts/master-delivery-agent.md`

- [ ] **Step 1: Define the shared role contract**

Each common prompt must state role, inputs, allowed actions, forbidden actions, expected status values, evidence required, and stop condition. Every prompt must explicitly say that task-specific packets supply objective, acceptance criteria, file scope, dependencies, timebox, and commands.

- [ ] **Step 2: Encode dynamic routing**

Put the approved routing table in `model-routing.md`: Luna/medium for routine coding and verification; Terra/high for auth, authorization, database, provider, security, integration, review, and reconciliation; Terra/ultra for architecture and decomposition. Require escalation and a recorded reason whenever a task crosses a boundary.

- [ ] **Step 3: Update the Master prompt**

Replace the current universal Terra/high implementation rule with the dynamic routing policy, while retaining Terra/high for independent review and Luna’s prohibition on approval and delivery decisions. Add the five-slot default mix and 45-minute-until-next-run guard.

- [ ] **Step 4: Validate prompt completeness**

Run `pnpm run agent:validate` and `pnpm run agent:test`. Expected: validation passes and all governance tests pass; no prompt may omit model, scope, evidence, escalation, or stop-condition language.

## Task 2: Contracts, policies, and ticket templates

**Files:**
- Create: `.agent/contracts/task-contract.md`
- Create: `.agent/contracts/handoff-contract.md`
- Create: `.agent/contracts/review-contract.md`
- Create: `.agent/policies/parallelism.md`
- Create: `.agent/policies/file-ownership.md`
- Create: `.agent/policies/escalation.md`
- Create: `.agent/templates/task-ticket.md`
- Create: `.agent/templates/verification-report.md`
- Create: `.agent/templates/review-packet.md`

- [ ] **Step 1: Define the task contract**

Require task ID, one user-visible outcome, acceptance IDs, allowed/forbidden files, dependencies, conflict risk, model/effort, timebox, tests, evidence, stop condition, and owner boundaries. Include the lifecycle `planned → coding → handoff-ready → verification → review → approved → committed → pushed`.

- [ ] **Step 2: Define parallelism and ownership**

Document five total slots, default `3 coding + 1 verifier + 1 reviewer`, review queue maximum two, dedicated branch/worktree per coder, no overlapping edit scopes, and serialized shared resources such as lockfiles and governance records.

- [ ] **Step 3: Define handoff and review packets**

Require exact changed-file lists, commands/results, sensitive-value omission statement, frozen manifest/hash, acceptance mapping, routing rationale, escalation log, and explicit reviewer decision. State that only exact `approved` with no P0/P1 permits commit/push.

- [ ] **Step 4: Add a runnable ticket example**

Complete `task-ticket.md` with concrete field labels and a small example showing a developer reaching `handoff-ready`, then starting a new isolated ticket while verification/review continue.

## Task 3: Rolling scheduler and escalation policies

**Files:**
- Modify: `.agent/prompts/master-delivery-agent.md`
- Modify: `.agent/README.md`
- Create: `.agent/policies/rolling-scheduler.md`

- [ ] **Step 1: Document the rolling scheduler algorithm**

Specify: inspect ready queue; compute time until next three-hour run; if `>45` minutes and scope fits, assign the next ticket to an available developer; otherwise assign no new coding and finish verification/review/freeze work. State that handoff-ready is the earliest safe reuse point and every new ticket gets a new worktree.

- [ ] **Step 2: Document queue protection**

When two completed tickets await review, stop adding coding work and convert capacity to verification/review support. When a task is blocked, clarify, escalate, or decompose rather than silently retrying.

- [ ] **Step 3: Document escalation**

Add triggers for security-sensitive code, provider access, database changes, cross-module integration, unexpected scope growth, and repeated test/review failure. Each escalation must identify the prior route, new route, reason, and owner decision if needed.

- [ ] **Step 4: Validate documentation references**

Run `rg -n "45 minutes|handoff-ready|review queue|gpt-5.6-luna|gpt-5.6-terra" .agent` and confirm all referenced paths exist. Run governance validation/tests.

## Task 4: Run metrics and governed adoption

**Files:**
- Create: `.agent/templates/run-metrics.md`
- Create: `.agent/metrics/delivery-metrics.yaml`
- Modify: `.agent/reports/progress/2026-08-29-agent-os.md`
- Modify: `CONVERSATION_MEMORY.md`
- Modify: `.agent/README.md`

- [ ] **Step 1: Define the metrics schema**

The YAML schema must record run ID/date, planning, coding, testing, review, remediation, documentation, waiting minutes, tickets started/completed/reworked, queue depth, model routes, escalations, and coding percentage. Include the target range `40–50%` and keep values free of secrets.

- [ ] **Step 2: Add the first baseline report**

Record the observed TASK-017/TASK-018 baseline: coding was approximately 10–28% of wall time; setup, serial verification, and review remediation were the main overhead. State the new Agent OS is ready for the next run but has not yet been measured in production use.

- [ ] **Step 3: Reconcile shared memory and README**

Add the Agent OS location, routing rules, rolling scheduler, and next action to `CONVERSATION_MEMORY.md` and `.agent/README.md` without duplicating existing project decisions.

- [ ] **Step 4: Run all governed checks**

Run `pnpm run agent:validate`, `pnpm run agent:test`, and `git diff --check`. Expected: validation passes, 32 governance tests pass, and no whitespace errors remain. Prepare a frozen file manifest for independent review.

## Final review and delivery

After Tasks 1–4, provide the complete task record, acceptance mapping, frozen diff/hash, and all command evidence to a fresh independent `gpt-5.6-terra / high` reviewer using `.agent/prompts/code-reviewer-agent.md`. Any P0/P1 or missing evidence blocks delivery. After exact approval, commit only the approved Agent OS files to `codex/agent-os-implementation` and push that dedicated branch. Do not merge protected branches or deploy without owner approval.
