# TASK-010 — Enforce product-first planning controls

- Status: verified
- Acceptance criteria: AC-GOV-03
- Owner: Master Delivery Agent
- Assigned agent: Master Delivery Agent
- Branch/worktree: codex/governance-bootstrap / C:\Users\onkar\.agents\worktrees\New Todo\governance-bootstrap
- Model/effort: gpt-5.6-terra / high
- Complexity rationale: A bounded governance-contract change that adds an executable prompt rule and validator coverage; high reasoning is required for the implementation and later independent review.
- Escalation: none

## Scope

Require the Master Delivery Agent to make every plan product-first: select the highest-priority ready acceptance criterion, plan one user-visible outcome with a small allowed file set, avoid repeated broad replanning, and defer non-web-core work until the approved sequence permits it. Enforce the Master-prompt requirement through the governance validator.

## Allowed files

- `.agent/prompts/master-delivery-agent.md`
- `.agent/delivery-ledger.yaml`
- `.agent/tasks/TASK-010-product-first-planning.md`
- `.agent/reviews/REVIEW-TASK-010-001.md`
- `.agent/reviews/REVIEW-TASK-010-002.md`
- `.agent/reviews/REVIEW-TASK-010-003.md`
- `.agent/reviews/packets/TASK-010-input.md`
- `.agent/reviews/packets/TASK-010-002-input.md`
- `.agent/reviews/packets/TASK-010-003-input.md`
- `scripts/validate-agent-governance.mjs`
- `scripts/validate-agent-governance.test.mjs`
- `CONVERSATION_MEMORY.md`

## Forbidden actions

- Do not modify product source, dependency manifests, credentials, or the dirty primary checkout.
- Do not weaken validation or change any product acceptance criterion.
- Do not commit or push without an exact independent `approved` review and fresh required gates.

## Assumptions

- The owner approval in the automation conversation authorizes this governance change.
- The existing `codex/governance-bootstrap` worktree is the isolated, clean implementation location.

## Prompt issued

Add the owner-approved product-first planning controls to the repository-owned Master Delivery Agent contract and make their presence validator-enforced. Use a failing test first, preserve all existing routing and safety requirements, document evidence, and request a fresh independent read-only Terra/high review after the diff is frozen.

## Actions log

| Time | Action | Result/evidence |
|---|---|---|
| 2026-08-26T22:27:22.1188525+01:00 | Created scoped task and ledger entry | Owner-requested governance task started in the clean governed worktree. |
| 2026-08-26T22:43:19.8351557+01:00 | Added product-first validator test and ran it | `pnpm agent:test` failed as expected: 29 passed, 1 failed; the Master prompt lacked the required controls. |
| 2026-08-26T22:43:19.8351557+01:00 | Implemented Master prompt controls and validator requirement | Master prompt now makes planning code/product-first and validator enforces the six required controls only for the Master prompt. |
| 2026-08-26T22:43:19.8351557+01:00 | Ran verification gates and froze review input | `pnpm agent:test` 30/30; `pnpm agent:validate`, lint, type-check, build, and `git diff --check` exited 0. Root `pnpm test` exited 0 with no configured package tasks. |
| 2026-08-26T22:43:19.8351557+01:00 | Received independent review `changes-required` | REVIEW-TASK-010-001 identified two P1s: missing enforcement for dependencies/stop condition and an over-broad `AC-GOV-02` task link. Root-cause probe reproduced the missing validation. |
| 2026-08-26T22:49:16.2915091+01:00 | Corrected both P1 findings test-first | Added focused negative tests for missing dependencies and missing stop condition; both failed before validator changes. Narrowed task linkage to `AC-GOV-03`, then added both validator requirements. |
| 2026-08-26T22:49:16.2915091+01:00 | Re-ran full gates and froze revised review input | `pnpm agent:test` 32/32; `pnpm agent:validate`, lint, type-check, build, and `git diff --check` exited 0. Root `pnpm test` exited 0 with no configured package tasks. |
| 2026-08-26T22:49:16.2915091+01:00 | Received independent revision-2 review `changes-required` | REVIEW-TASK-010-002 confirmed both initial P1s are remediated and found one P1: frozen review artifacts were not fully mapped to this task's allowed and changed-file lists. |
| 2026-08-26T22:53:23.9721674+01:00 | Mapped all review artifacts and froze final packet | Added every past and final review packet/report to allowed files and Files changed; final reviewer packet prepared. |
| 2026-08-26T22:56:54.2408488+01:00 | Received final independent review `approved` | REVIEW-TASK-010-003 found no P0–P3 findings and confirmed exact-approved-only gates, traceability, and all eight planning controls. |

## Files changed

- `.agent/delivery-ledger.yaml`
- `.agent/prompts/master-delivery-agent.md`
- `.agent/reviews/REVIEW-TASK-010-001.md`
- `.agent/reviews/REVIEW-TASK-010-002.md`
- `.agent/reviews/REVIEW-TASK-010-003.md`
- `.agent/reviews/packets/TASK-010-input.md`
- `.agent/reviews/packets/TASK-010-002-input.md`
- `.agent/reviews/packets/TASK-010-003-input.md`
- `scripts/validate-agent-governance.mjs`
- `scripts/validate-agent-governance.test.mjs`
- `.agent/tasks/TASK-010-product-first-planning.md`
- `CONVERSATION_MEMORY.md`

## Evidence

- Tests: `pnpm agent:test` — 32 passed, 0 failed; red phases observed 29 passed/1 failed before initial enforcement and 30 passed/2 failed before P1 remediation. Root `pnpm test` exited 0 but ran no package tasks.
- Type check: `pnpm type-check` — exit 0.
- Lint: `pnpm lint` — exit 0; 10 pre-existing web explicit-return-type warnings replayed from cache.
- Build: `pnpm build` — exit 0; the same 10 pre-existing warnings replayed from cache.
- Integration/security/provider checks: Not applicable; no product or provider code may change.
- Frozen diff: `.agent/reviews/packets/TASK-010-003-input.md` at base `1704ed4acd6cc38183793ac7d9149dc57519baf9`.

## Review result

- Review report: `.agent/reviews/REVIEW-TASK-010-003.md` — `approved`; prior review history remains in `001` and `002`.
- Reviewer/model/effort: Fresh independent `gpt-5.6-terra` / high.
- Decision: `approved`.
- Open findings: None; P0/P1/P2/P3 = 0/0/0/0.

## Decisions and handoff

- Product-first planning is an owner-approved governance requirement. The task acceptance link is narrowed to `AC-GOV-03`: it changes the Master Agent role contract and preserves the independent-review gate, rather than claiming completion of the wider controller-bootstrap criterion `AC-GOV-02`.
- Final independent review approved the exact frozen scope. Re-run final gates after this documentation update, then commit and push only TASK-010 to `codex/governance-bootstrap`.

## Git result

- Commit: Pending.
- Branch: codex/governance-bootstrap.
- Push: Pending.
