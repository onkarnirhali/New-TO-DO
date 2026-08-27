# Sprint Delivery Reporting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enforce a 90-minute, release-candidate-focused delivery sprint and a simple report with local UI test steps on every three-hour controller run.

**Architecture:** The repository-owned Master prompt and automation manifest define the operating contract. The governance validator rejects a Master prompt or manifest that omits the sprint budget, bounded parallelism, release-candidate reporting, local UI test guidance, or the exact owner-help heading. The live Codex automation changes only after an exact independent approval.

**Tech Stack:** Markdown, JSON, Node.js `node:test`, pnpm, Codex Automations.

---

### Task 1: Add failing sprint-contract validation

**Files:**
- Modify: `scripts/validate-agent-governance.test.mjs`
- Test: `scripts/validate-agent-governance.test.mjs`

- [ ] **Step 1: Add a failing Master-prompt case**

Add a test whose prompt contains every existing product-first and model-routing control, but omits `90-minute sprint`, `no more than two implementation subagents`, `release-candidate progress`, `How to test locally`, and `Onkar We need your help`.

- [ ] **Step 2: Run the governance suite**

Run: `pnpm agent:test`
Expected: fail because `validatePrompt("master-delivery-agent.md", ...)` does not yet require the sprint-reporting controls.

### Task 2: Enforce the Master prompt and manifest contract

**Files:**
- Modify: `scripts/validate-agent-governance.mjs`
- Modify: `scripts/validate-agent-governance.test.mjs`
- Modify: `.agent/prompts/master-delivery-agent.md`
- Modify: `.agent/automations/master-delivery-controller.json`
- Modify: `.agent/automations/master-delivery-controller.md`
- Modify: `.agent/templates/progress-report.md`

- [ ] **Step 1: Implement minimal validation**

In `validatePrompt`, add a Master-only `sprintReporting` pattern list requiring the five controls from Task 1 plus `under three minutes`. Extend `validateAutomation` so the manifest requires `sprintBudgetMinutes: 90`, `maxImplementationAgents: 2`, and `reportReadLimitMinutes: 3`.

- [ ] **Step 2: Update fixture data**

Extend the repository-fixture Master prompt and automation JSON in `scripts/validate-agent-governance.test.mjs` with the required values, so fixture validation still models a complete repository.

- [ ] **Step 3: Update operating documents**

Add a dedicated 90-minute sprint section to the Master prompt: 10 minutes reconcile/plan, 45 implementation, 20 independent review/P0-P1 follow-up, and 15 verification/reporting. It must stop new work at the deadline, allow no more than two independent implementation agents, and preserve existing review/commit gates. Require every report to state release-candidate progress, simple-English implementation progress, blockers, next action, `How to test locally`, and `Onkar We need your help` only when an owner-controlled external action is needed.

- [ ] **Step 4: Run the governance suite**

Run: `pnpm agent:test`
Expected: pass, including the new rejection case and all existing cases.

### Task 3: Record, verify, review, and activate

**Files:**
- Modify: `.agent/delivery-ledger.yaml`, `.agent/tasks/TASK-013-sprint-delivery-reporting.md`
- Create: task packet/review/progress/run records under `.agent/`
- Modify: `CONVERSATION_MEMORY.md`

- [ ] **Step 1: Run final gates**

Run: `pnpm agent:validate`, `pnpm agent:test`, `pnpm lint`, `pnpm type-check`, `pnpm test`, `pnpm build`, and `git diff --check`.
Expected: all commands exit 0; record pre-existing warnings without weakening them.

- [ ] **Step 2: Freeze and independently review**

Create a reproducible changed-file SHA-256 manifest. Load `.agent/prompts/code-reviewer-agent.md` and give the complete packet to a fresh read-only `gpt-5.6-terra` / high reviewer. A decision other than exact `approved` blocks activation, commit, and push.

- [ ] **Step 3: Activate after approval only**

Update Codex Automation `new-todo-master-delivery-agent` with the approved sprint/reporting contract while retaining its three-hour Europe/London schedule and Terra/ultra controller route. Commit and push only if all gates and review are green.
