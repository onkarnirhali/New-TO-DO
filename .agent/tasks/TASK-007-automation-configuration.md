# TASK-007 — Configure the three-hour delivery controller

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
described bounded JSON/Markdown configuration with explicit tests. It did not
preserve a concrete model identifier or escalation record, so these lifecycle
fields intentionally record historical evidence unavailable.

## Scope

Add and validate the exact three-hour Europe/London dry-run-first manifest,
setup instructions, report directory, and dry-run output contract.

## Forbidden actions

- Do not change the external automation schedule or project configuration from
  repository code.
- Do not enable delegation before full bootstrap review and owner approval.
- Never permit protected merge or deployment.

## Assumptions

- The existing Codex Automation is external state; this task records the
  repository-owned desired configuration and authority contract.

## Prompt issued

Execute Implementation Plan Task 6 test-first and enforce the exact manifest,
dry-run gate, report contract, and non-protected push boundary.

## Actions log

- Added and observed failing automation-validator export and behavior tests.
- Implemented exact manifest validation.
- Added and observed a failing repository manifest-presence test.
- Added configuration, setup, dry-run contract, and report directory.

## Files changed

- `.agent/automations/master-delivery-controller.json`
- `.agent/automations/master-delivery-controller.md`
- `.agent/reports/automation-runs/.gitkeep`
- `.agent/tasks/TASK-007-automation-configuration.md`
- `scripts/validate-agent-governance.mjs`
- `scripts/validate-agent-governance.test.mjs`

## Evidence

- Tests: `pnpm agent:test` — 22 passed, 0 failed before manifest creation; final
  task verification pending.
- Validator: `pnpm agent:validate` — passed.
- Type check: `pnpm type-check` — passed.
- Lint: `pnpm lint` — passed with 10 pre-existing web return-type warnings.
- Build: `pnpm build` — passed; root `pnpm test` ran zero package tasks.

## Review result

Pending fresh independent `gpt-5.6-terra` high review.

## Decisions and handoff

The consolidated reviewer must confirm cadence, timezone, dry-run gating,
documentation, authority, routing, and no merge/deploy permission.

## Git result

Pending exact approved review.
