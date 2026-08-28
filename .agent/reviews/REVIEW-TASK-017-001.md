# Code Review — TASK-017

- Reviewer: Code Reviewer Agent
- Reviewer run/model: /root/dashboard_default_columns_review / gpt-5.6-terra high
- Review ID: REVIEW-TASK-017-001
- Review mode: independent, read-only
- Decision: changes-required
- Reviewed at: 2026-08-28T21:19:17.6115499+01:00
- Branch/worktree: `codex/task-017-dashboard-default-columns` / `C:\Users\onkar\.agents\worktrees\New Todo\dashboard-default-columns`
- Frozen diff: `4ee22c055b6258fa09d05d67e87ae192f6c4ca5e` + frozen manifest `634f40ed24c7e2d0afe664558b468dfd839a58aa6cc29860ab4abc708224c02d`

## Task and acceptance criteria

- Task: TASK-017 — Create dashboards with default columns.
- Acceptance criteria: AC-KANBAN-01.
- Intended outcome: A user-owned dashboard is written atomically with exactly `To Do`, `In Progress`, and `Done` default columns in ascending positions, with focused regression coverage and production-safe test configuration.

## Evidence inspected

- Frozen diff: all six implementation-file SHA-256 values match `TASK-017-freeze.md`; the worktree is still based at `4ee22c055b6258fa09d05d67e87ae192f6c4ca5e`. The frozen implementation scope matches the task-owned code/configuration files. The pre-existing Master dispatch change in `.agent/delivery-ledger.yaml` is excluded by the manifest.
- Changed files: `apps/api/package.json`, `apps/api/jest.config.cjs`, `apps/api/tsconfig.build.json`, `apps/api/nest-cli.json`, `apps/api/src/dashboards/dashboards.service.ts`, and `apps/api/src/dashboards/dashboards.service.spec.ts`; task, API-service-memory, and packet documentation were also inspected.
- Implementer commands and results: inspected recorded RED/GREEN focused Jest evidence; full API test, lint, type-check, build, governance validation/test, and `git diff --check` evidence in the task and input packet.
- Reviewer commands and results:
  - `pnpm --filter @planote/api test` — passed: 1 suite / 1 test.
  - `pnpm --filter @planote/api lint` — passed.
  - `pnpm --filter @planote/api type-check` — passed.
  - `pnpm --filter @planote/api build` — passed.
  - `pnpm agent:validate` — passed.
  - `pnpm agent:test` — passed: 32 / 32.
  - `git diff --check 4ee22c055b6258fa09d05d67e87ae192f6c4ca5e` and no-index whitespace checks for the three untracked implementation files — passed.
  - `pnpm install --lockfile-only --frozen-lockfile` — failed with `ERR_PNPM_OUTDATED_LOCKFILE`: `apps/api/package.json` declares Jest dependencies absent from `pnpm-lock.yaml`.
- Documentation and memory reviewed: `AGENTS.md`, `CONVERSATION_MEMORY.md`, `docs/planning/PLANNING_INDEX.md`, `docs/planning/07-master-delivery-plan.md`, `.agent/prompts/code-reviewer-agent.md`, `.agent/memory/services/api.md`, task record, input packet, freeze packet, delivery ledger, and review template.

## Acceptance-criteria assessment

| Criterion | Status: verified / failed / blocked | Code and test evidence |
|---|---|---|
| AC-KANBAN-01 | blocked | `DashboardsService.create` supplies the owner ID and dashboard fields in one Prisma `dashboard.create` nested write, with exact default columns at positions `0`, `10`, and `20` (`apps/api/src/dashboards/dashboards.service.ts:41-57`). The focused test asserts that exact one-call shape (`apps/api/src/dashboards/dashboards.service.spec.ts:23-40`), and existing controller ownership resolution continues to bind the request to the authenticated internal user (`apps/api/src/dashboards/dashboards.controller.ts:45-52`). However, the new test runtime cannot be installed from the committed dependency graph because the lockfile is stale; the test proof is therefore not reproducible in a clean CI checkout. |

## Findings

### [P1] Jest dependencies are absent from the lockfile

- Task: TASK-017
- Acceptance criterion: AC-KANBAN-01
- Evidence: `apps/api/package.json:37-42` adds `@types/jest`, `jest`, and `ts-jest`, but `pnpm-lock.yaml` has no corresponding importer specifiers or package entries. Fresh reviewer command `pnpm install --lockfile-only --frozen-lockfile` exits non-zero with `ERR_PNPM_OUTDATED_LOCKFILE` and identifies `apps/api/package.json` as out of sync.
- Impact: A clean/CI install (which uses frozen lockfile semantics) cannot install the task's required test infrastructure. The green service test was run against pre-existing local dependencies and does not establish reproducible release evidence.
- Required action: Regenerate and include the root `pnpm-lock.yaml` using the approved package manager, without changing unrelated dependency versions; then refreeze the implementation manifest and rerun the complete task gate set from the repaired dependency graph.
- Verification: `pnpm install --lockfile-only --frozen-lockfile` exits 0 after the generated lockfile is present; rerun focused/full API tests, API lint/type-check/build, `pnpm agent:validate`, `pnpm agent:test`, and `git diff --check`.
- Decision: Block completion and any commit/push until remediation receives a fresh independent review.

## Follow-up traceability

| Finding | Priority | Accepted / rejected | Owner | Follow-up task ID |
|---|---|---|---|---|
| REVIEW-TASK-017-001-01 | P1 | required remediation | implementation-agent | TASK-017 |

## Quality assessment

- Functional correctness: The nested Prisma relation write makes dashboard and starter-column persistence one atomic database operation. The exact default titles and ascending gap positions satisfy the scoped missing invariant. The returned shape and existing create route remain unchanged.
- Code quality and simplicity: Minimal, idiomatic Prisma nested write; no unnecessary abstraction or unrelated production change.
- Reuse and SOLID/architecture: The dashboard service retains ownership/position responsibilities; controller authentication-to-user resolution stays at the boundary. No duplicated default-column creation path was introduced.
- Performance: One pre-existing position lookup plus one dashboard mutation with nested child inserts; no new N+1 behavior or unbounded work.
- Security: The create flow continues to receive the internal user ID resolved from the Clerk-authenticated request. The nested column records attach only to the newly created owned dashboard; no caller-controlled owner field, provider, secret, or database configuration was added.
- Tests: The focused service test directly proves the exact Prisma write shape and passes. Jest configuration correctly maps emitted `.js` imports for TypeScript tests, and the Nest build config excludes specs. The P1 lockfile defect prevents this evidence from being reproducible in a clean install.
- Documentation: Task record, API service memory, input packet, and freeze packet accurately describe the intended atomic write and test coverage. The reviewer report records the lockfile gap; task review fields were intentionally not changed because the decision is not exact `approved`.

## Handoff to Master Delivery Agent

- Blocking work: Regenerate and include `pnpm-lock.yaml` for the declared Jest dependencies; refresh the frozen manifest/packet and request a new independent Terra/high review.
- Tracked P2/P3 follow-ups: none.
- Commit/push permitted: no.
- Required next action: Return TASK-017 to its implementation agent for the narrowly scoped lockfile remediation. Do not commit or push the current frozen diff.
