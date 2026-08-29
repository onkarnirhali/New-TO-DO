# Review Input Packet — TASK-017

- Frozen at: 2026-08-28T21:29:00+01:00
- Base commit: `4ee22c055b6258fa09d05d67e87ae192f6c4ca5e`
- Branch/worktree: `codex/task-017-dashboard-default-columns` / `C:\Users\onkar\.agents\worktrees\New Todo\dashboard-default-columns`
- Frozen implementation manifest: `.agent/reviews/packets/TASK-017-freeze.md`
- Implementer routing: gpt-5.6-terra / high; bounded API transaction and ownership invariant.
- Review routing: fresh independent gpt-5.6-terra / high; required for acceptance, code-quality, and security review.
- Authority: read-only review only. Do not edit, self-approve, commit, push, merge, deploy, alter credentials, providers, databases, or the R2-blocked AC-OPS-02 hold.

## Acceptance-criterion mapping

| Criterion | Implementer evidence | Review question |
|---|---|---|
| AC-KANBAN-01 | `DashboardsService.create` now makes one nested Prisma `dashboard.create` write with `To Do`/`In Progress`/`Done` at `0`/`10`/`20`; focused red/green service test proves the write shape. | Does this exact atomic write preserve existing ownership/position behavior and sufficiently evidence the default-column portion of the criterion? |

## Frozen changed files

- `apps/api/package.json`
- `apps/api/jest.config.cjs`
- `apps/api/tsconfig.build.json`
- `apps/api/nest-cli.json`
- `apps/api/src/dashboards/dashboards.service.ts`
- `apps/api/src/dashboards/dashboards.service.spec.ts`
- `pnpm-lock.yaml`

Task documentation: `.agent/tasks/TASK-017-dashboard-default-columns.md` and
`.agent/memory/services/api.md`. Reviewer artifacts are this packet and
`.agent/reviews/packets/TASK-017-freeze.md`. The master-created
`.agent/delivery-ledger.yaml` dispatch entry predates implementation and is not
part of the frozen implementation scope.

## Verification evidence

- RED: `pnpm --filter @planote/api exec jest --config jest.config.cjs dashboards.service.spec.ts --runInBand` exited 1 because the received `dashboard.create` data lacked `columns.create`.
- GREEN: the same focused command passed 1 suite / 1 test.
- Full API tests: `pnpm --filter @planote/api test` — exit 0, 1 suite / 1 test.
- API lint: `pnpm --filter @planote/api lint` — exit 0.
- API type-check: `pnpm --filter @planote/api type-check` — exit 0.
- API build: `pnpm --filter @planote/api build` — exit 0.
- Governance tests: `pnpm agent:test` — exit 0, 32 passed / 0 failed.
- Final governance validation: `pnpm agent:validate` — exit 0. Whitespace: `git diff --check` — exit 0.
- P1 remediation: `pnpm install --lockfile-only --no-frozen-lockfile` regenerated only `pnpm-lock.yaml`; subsequent `pnpm install --lockfile-only --frozen-lockfile` exited 0.
- Post-lockfile focused/full API tests, API lint/type-check/build, `pnpm agent:validate`, `pnpm agent:test` (32 passed), and `git diff --check` all exited 0; exact command detail is in the task record.

## Reviewer request

Read `.agent/prompts/code-reviewer-agent.md`, the task record, the master
delivery plan, API service memory, this packet, the frozen manifest, and the
complete task-owned diff. Inspect acceptance criteria, correctness, quality,
simplicity/reuse, SOLID/design, ownership/security, tests, and documentation.
Return one evidence-backed P0–P3 decision. Any decision other than exact
`approved` prohibits commit and push.
