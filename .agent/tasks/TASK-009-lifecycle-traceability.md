# TASK-009 — Enforce task-record lifecycle traceability

- Status: review
- Acceptance criteria: AC-GOV-01, AC-GOV-02, AC-GOV-03
- Owner: Master Delivery Agent
- Assigned agent: Codex implementation agent
- Branch/worktree: `codex/governance-bootstrap` / `C:\Users\onkar\.agents\worktrees\New Todo\governance-bootstrap`
- Model/effort: gpt-5.6-terra / high
- Complexity rationale: Cross-file governance validation and preservation of historical provenance are safety-critical lifecycle controls.
- Escalation: none

## Scope

Require every delivery-ledger task to have a readable lifecycle record whose
task ID, status, and acceptance criteria match the ledger; require lifecycle
metadata and permitted model routing; preserve historical evidence without
retroactive fabrication; and refresh the frozen reviewer handoff material.

## Allowed files

- `scripts/validate-agent-governance.mjs`
- `scripts/validate-agent-governance.test.mjs`
- `.agent/delivery-ledger.yaml`
- `.agent/tasks/TASK-001-code-reviewer-agent.md` through this record
- `.agent/reviews/**`
- `CONVERSATION_MEMORY.md`

## Forbidden actions

- Do not modify product application source, credentials, deployment settings,
  external automation, protected branches, or the primary checkout.
- Do not review, approve, verify, commit, push, merge, deploy, or claim owner
  approval for any task.

## Assumptions

- The current ledger is the authoritative task-to-record mapping.
- `historical evidence unavailable` records missing historical route metadata
  only when an explicit Historical provenance section explains the gap.
- Current concrete routes are restricted to supported Terra/Luna model-effort
  pairs; generic Codex-session labels are not concrete evidence.

## Prompt issued

Implement TASK-009 test-first. Before validator changes, prove that repository
validation currently ignores missing/mismatched task records and their metadata.
Then enforce record existence, parity, lifecycle metadata, permitted routing,
and honest historical provenance; refresh review handoff without approval or
external Git actions.

## Actions log

| Time | Action | Result/evidence |
|---|---|---|
| 2026-08-26T09:00:00+01:00 | Created ledger and task record | TASK-009 began active with the stated scope and authority boundary. |
| 2026-08-26T09:00:00+01:00 | TDD red | `pnpm agent:test` failed as expected: 24 passed, 5 failed. Each new fixture assertion reported `Missing expected rejection`, proving `validateRepository` had not read ledger task records. |
| 2026-08-26T09:00:00+01:00 | TDD green | Added minimal ledger task-record enumeration, required reads, `validateTaskRecord` invocation, parity, metadata, route, and provenance checks. `pnpm agent:test` then passed 29/29. |
| 2026-08-26T09:00:00+01:00 | Reviewer handoff | Created the initial read-only P1 `changes-required` report. Final V4 packet creation remains an implementation handoff, not an approval. |

## Files changed

- `scripts/validate-agent-governance.mjs`
- `scripts/validate-agent-governance.test.mjs`
- `.agent/delivery-ledger.yaml`
- `.agent/tasks/TASK-001-code-reviewer-agent.md` through this record
- `CONVERSATION_MEMORY.md`

## Evidence

- Tests: red 24 passed / 5 failed with expected missing lifecycle rejections;
  green `pnpm agent:test` 29 passed / 0 failed.
- Type check: `pnpm type-check` exit 0; 2/2 tasks successful.
- Lint: `pnpm lint` exit 0; 2/2 tasks successful with 10 existing web
  explicit-return-type warnings.
- Build: `pnpm build` exit 0; API and web build tasks successful with the same
  existing warnings.
- Integration/security/provider checks: not applicable; governance validation
  is local and read-only.
- Frozen diff: `.agent/reviews/packets/FROZEN-SNAPSHOT-V4.md`; 38 non-review
  paths and manifest integrity were recomputed after creation.

## Review result

- Review report: `.agent/reviews/REVIEW-TASK-009-001-initial.md`.
- Reviewer/model/effort: initial P1 report `gpt-5.6-terra` / high.
- Decision: `changes-required`; no approval claimed.
- Open findings: corrective implementation is complete locally; a fresh
  independent task-level decision remains required.

## Decisions and handoff

Implementation evidence is complete and this record and its ledger entry are
now `review`. A fresh independent reviewer—not this implementation agent—must
make the task-level decision. No status permits commit or push without exact
independent approval and Master authority.

## Git result

- Commit: none
- Branch: `codex/governance-bootstrap`
- Push: none
