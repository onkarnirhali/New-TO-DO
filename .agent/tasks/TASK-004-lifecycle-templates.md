# TASK-004 — Add auditable lifecycle templates

- Status: review
- Acceptance criteria: AC-GOV-02
- Owner: Master Delivery Agent
- Assigned agent: Codex
- Branch/worktree: `codex/governance-bootstrap`
- Model/effort: historical evidence unavailable
- Complexity rationale: historical evidence unavailable
- Escalation: historical evidence unavailable

## Historical provenance

The original record stated `current Codex implementation session / medium` and
described bounded Markdown templates plus focused validator tests. It did not
preserve a concrete model identifier or escalation record, so these lifecycle
fields intentionally record historical evidence unavailable.

## Scope

Add task, review, ADR, progress, and handoff templates and require complete
lifecycle evidence for finished task records.

## Forbidden actions

- Do not alter application code, credentials, or external state.
- Do not weaken existing reviewer requirements.

## Assumptions

- Both `complete` (legacy task prose) and `verified` trigger completed-record
  validation even though the ledger uses `verified`.

## Prompt issued

Execute Implementation Plan Task 3 test-first and require complete task records
and all lifecycle templates.

## Actions log

- Added and observed failing validator-export and incomplete-record tests.
- Implemented completed-task heading validation.
- Added and observed a failing missing-template repository test.
- Required all five lifecycle templates.

## Files changed

- `.agent/templates/task.md`
- `.agent/templates/code-review.md` (pre-existing, retained)
- `.agent/templates/adr.md`
- `.agent/templates/progress-report.md`
- `.agent/templates/agent-handoff.md`
- `.agent/tasks/TASK-004-lifecycle-templates.md`
- `scripts/validate-agent-governance.mjs`
- `scripts/validate-agent-governance.test.mjs`

## Evidence

- Tests: `pnpm agent:test` — 13 passed, 0 failed before template creation;
  final task verification pending.
- Validator: `pnpm agent:validate` — passed.
- Type check: `pnpm type-check` — passed.
- Lint: `pnpm lint` — passed with 10 pre-existing web return-type warnings.
- Build: `pnpm build` — passed; root `pnpm test` ran zero package tasks.

## Review result

Pending fresh independent Code Reviewer Agent review.

## Decisions and handoff

Provide the frozen diff and command evidence to the consolidated governance
review after Tasks 1–6 are locally complete.

## Git result

Pending approved review.
