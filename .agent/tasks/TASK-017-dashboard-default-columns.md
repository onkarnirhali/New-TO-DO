# TASK-017 — Create dashboards with default columns

- Status: active
- Acceptance criteria: AC-KANBAN-01
- Owner: Master Delivery Agent
- Assigned agent: implementation-agent / gpt-5.6-terra high
- Branch/worktree: `codex/task-017-dashboard-default-columns` / `C:\Users\onkar\.agents\worktrees\New Todo\dashboard-default-columns`
- Model/effort: gpt-5.6-terra / high
- Complexity rationale: The change is a bounded backend transaction and ownership invariant; high effort is required for test-first implementation and production-quality API coverage.
- Escalation: none.

## Scope

Make dashboard creation atomic: an owned dashboard is created with exactly the
default columns `To Do`, `In Progress`, and `Done`, in ascending positions. Add
the minimal API test infrastructure required to prove the behavior and preserve
the existing dashboard/column API contract.

## Allowed files

- `apps/api/package.json`
- `apps/api/jest.config.cjs`
- `apps/api/tsconfig.build.json`
- `apps/api/nest-cli.json`
- `apps/api/src/dashboards/dashboards.service.ts`
- `apps/api/src/dashboards/dashboards.service.spec.ts`
- `pnpm-lock.yaml`
- `.agent/tasks/TASK-017-dashboard-default-columns.md`
- `.agent/memory/services/api.md`
- `.agent/reviews/packets/TASK-017-input.md`
- `.agent/reviews/packets/TASK-017-freeze.md`

## Forbidden actions

Do not change Prisma schema or migrations, Clerk/auth/provider configuration,
credentials, database contents, unrelated API modules, web code, governance
policy, the dirty primary checkout, or Git history. Do not commit, push,
merge, deploy, or self-approve.

## Assumptions

The approved master plan defines these exact three initial columns. Existing
dashboard ownership behavior remains correct; this task only closes the missing
atomic default-column invariant and supplies focused regression evidence.

## Prompt issued

Implement test-first from this record and `.agent/prompts/implementation-agent.md`.
First create a focused test proving one dashboard create uses an atomic write and
creates exactly the three ordered default columns. Observe its expected failure,
then make the smallest production change. Capture RED/GREEN, focused and full
API test output, type-check, lint, build, governance validation, and diff check.
Freeze the scoped diff and prepare a complete reviewer packet. Stop before any
commit or push.

## Actions log

| Time | Action | Result/evidence |
|---|---|---|
| 2026-08-28T20:32:00.8800006+01:00 | Master selected next ready launch-blocker outcome after deferring AC-OPS-02. | AC-KANBAN-01 requires no provider dependency; current service create path omits default columns. |
| 2026-08-28T20:32:00.8800006+01:00 | Isolated worktree created and task dispatched. | Branch is based on governed delivery commit `4ee22c055b6258fa09d05d67e87ae192f6c4ca5e`; primary checkout remains untouched. |
| 2026-08-28T21:05:00+01:00 | Read task contract, delivery plan, repository memory, and dashboard service. | Scope is bounded to an atomic nested dashboard write; no provider, credential, database, or primary-checkout action is needed. |
| 2026-08-28T21:09:00+01:00 | Added focused Jest service test and minimum local test configuration. | First runner attempt exposed absent worktree dependencies; Prisma client generation completed without contacting a database. |
| 2026-08-28T21:12:00+01:00 | Observed focused RED test. | `dashboards.service.spec.ts` failed exactly because `dashboard.create` lacked the expected `columns.create` array. |
| 2026-08-28T21:13:00+01:00 | Added minimal nested default-column write and observed GREEN. | Focused test passed: 1 suite, 1 test. |
| 2026-08-28T21:16:00+01:00 | Ran API and governance gates. | API test/lint/type-check/build and governance tests passed; initial `agent:validate` found task-record backticks around the route, corrected within this allowed task record before final rerun. |
| 2026-08-28T21:21:00+01:00 | Prepared frozen reviewer packet and reran all local gates. | API test/lint/type-check/build, `pnpm agent:test` (32 passed), and `git diff --check` passed. `agent:validate` correctly rejected an uncoordinated `review` task status because the Master-owned ledger remains `active`; record restored to `active` pending controller transition. |
| 2026-08-28T21:27:00+01:00 | Received and reproduced REVIEW-TASK-017-001 P1. | `pnpm install --lockfile-only --frozen-lockfile` failed with `ERR_PNPM_OUTDATED_LOCKFILE`: the API importer omitted the declared Jest dependency specifiers. |
| 2026-08-28T21:28:00+01:00 | Regenerated only the root lockfile using pnpm. | `pnpm install --lockfile-only --no-frozen-lockfile` updated `pnpm-lock.yaml`; the exact frozen-install command then exited 0. Refreshed freeze manifest includes lockfile. |
| 2026-08-28T21:31:00+01:00 | Reran post-remediation verification. | Frozen lockfile install, focused/full API tests, API lint/type-check/build, governance validation/tests, and whitespace check all exited 0. |

## Files changed

- `apps/api/package.json`
- `apps/api/jest.config.cjs`
- `apps/api/tsconfig.build.json`
- `apps/api/nest-cli.json`
- `apps/api/src/dashboards/dashboards.service.ts`
- `apps/api/src/dashboards/dashboards.service.spec.ts`
- `pnpm-lock.yaml`
- `.agent/memory/services/api.md`
- `.agent/tasks/TASK-017-dashboard-default-columns.md`
- `.agent/reviews/packets/TASK-017-input.md`
- `.agent/reviews/packets/TASK-017-freeze.md`

## Evidence

- Tests: RED: `pnpm --filter @planote/api exec jest --config jest.config.cjs dashboards.service.spec.ts --runInBand` exited 1 because the received `dashboard.create` data omitted `columns.create`; GREEN and post-lockfile focused rerun both passed 1/1. Full post-lockfile `pnpm --filter @planote/api test` passed 1 suite / 1 test.
- Type check: post-lockfile `pnpm --filter @planote/api type-check` exit 0.
- Lint: post-lockfile `pnpm --filter @planote/api lint` exit 0.
- Build: post-lockfile `pnpm --filter @planote/api build` exit 0.
- Governance: post-lockfile `pnpm agent:test` exit 0 (32 passed), `pnpm agent:validate` exit 0, and `git diff --check` exit 0.
- Frozen install: `pnpm install --lockfile-only --no-frozen-lockfile` regenerated `pnpm-lock.yaml`; `pnpm install --lockfile-only --frozen-lockfile` exit 0.
- Integration/security/provider checks: not applicable; task does not access a database, provider, credential, or external system.
- Frozen diff: `.agent/reviews/packets/TASK-017-freeze.md` — implementation manifest SHA-256 `37e4e3e9104baffc600de8d8493b742b9bb0f7ab627a58a859dca35c8a0a4639`, based on `4ee22c055b6258fa09d05d67e87ae192f6c4ca5e`.

## Review result

- Review reports: `.agent/reviews/REVIEW-TASK-017-001.md` — P1 lockfile drift; `.agent/reviews/REVIEW-TASK-017-002.md` — fresh independent approval after remediation.
- Reviewer/model/effort: fresh independent gpt-5.6-terra / high; high effort was required for acceptance, correctness, security, and reproducibility review.
- Decision: approved — exact frozen scope has P0: 0, P1: 0, P2: 0, P3: 0 and all required gates are green.
- Open findings: none. `REVIEW-TASK-017-001-01` is closed by the pnpm-generated lockfile and fresh `pnpm install --lockfile-only --frozen-lockfile` evidence.

## Decisions and handoff

The R2-dependent AC-OPS-02 work remains blocked, not cancelled. This task is
the next non-overlapping ready outcome and remains backend-only. The test proves
the service emits one nested Prisma write with the three approved default
columns; an independent reviewer must decide whether that evidence is sufficient
for the broader dashboard-create portion of AC-KANBAN-01. Completion requires
exact reviewer approval with no open P0/P1 finding.

## Git result

- Commit: forbidden until exact-approved review and all gates pass.
- Branch: `codex/task-017-dashboard-default-columns`.
- Push: forbidden until exact-approved review and all gates pass.
