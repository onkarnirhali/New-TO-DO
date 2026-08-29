# TASK-018 — Deliver admin platform health endpoint

- Status: active
- Acceptance criteria: AC-OPS-02
- Owner: Master Delivery Agent
- Assigned agent: implementation-agent / gpt-5.6-terra high
- Branch/worktree: `codex/task-018-platform-health` / `C:\Users\onkar\.agents\worktrees\New Todo\platform-health`
- Model/effort: gpt-5.6-terra / high
- Complexity rationale: This bounded backend task adds an authorization boundary and probes three dependencies. High effort is required for test-first implementation, secret-safe error handling, and integration-quality evidence.
- Escalation: none.

## Scope

Implement AC-OPS-02 as `GET /admin/health`: Clerk-authenticated and locally admin-authorized health status for API, database, Redis, and R2. Preserve the public compatibility heartbeat at `GET /health`. Return only compact status values and never any configuration, provider, object, or error details.

## Allowed files

- `apps/api/package.json`
- `pnpm-lock.yaml`
- `apps/api/src/app.module.ts`
- `apps/api/src/config/config.service.ts`
- `apps/api/src/auth/guards/admin.guard.ts`
- `apps/api/src/auth/guards/admin.guard.spec.ts`
- `apps/api/src/health/**`
- `.agent/tasks/TASK-018-platform-health.md`
- `.agent/reviews/packets/TASK-018-input.md`
- `.agent/reviews/packets/TASK-018-freeze.md`
- `.agent/memory/services/api.md`
- governed acceptance, traceability, progress, decision, review, automation, and conversation-memory records directly required to close TASK-018.

## Forbidden actions

Do not edit the dirty primary checkout, schema or migrations, users or database contents, Cloudflare/provider configuration, credentials, deployment configuration, web UI, unrelated modules, governance policy, or Git history. Do not commit, push, merge, deploy, publish, self-approve, print secrets, print endpoint values, or log provider error details.

## Assumptions

The owner has supplied local R2 configuration and a bounded, secret-safe list smoke has already succeeded. An admin user may need owner-controlled provisioning for a production browser smoke; this task proves the guard with automated tests and leaves user-data changes out of scope.

## Prompt issued

Implement test-first from `docs/superpowers/plans/2026-08-29-platform-health.md`. First add focused failing tests for guard and readiness behavior; then make the smallest production change. Register a non-public admin route while leaving the existing public heartbeat intact. All dependency failures must reduce to status only. Capture RED/GREEN and focused/full API test, lint, type-check, build, frozen-install, governance validation, provider smoke provenance, and diff-check evidence. Prepare a complete review packet and freeze manifest. Stop before any commit or push.

## Actions log

| Time | Action | Result/evidence |
|---|---|---|
| 2026-08-29T09:30:00+01:00 | Master reconciled provider readiness and selected AC-OPS-02. | Owner-confirmed local R2 configuration was verified with a bounded, credential-safe S3-compatible list request; the former external blocker is cleared. |
| 2026-08-29T09:35:00+01:00 | Design and governed plan approved. | `docs/superpowers/specs/2026-08-29-platform-health-design.md` and `docs/superpowers/plans/2026-08-29-platform-health.md` constrain task scope and security behavior. |
| 2026-08-29T10:00:00+01:00 | Read the full task packet and checked the isolated baseline. | The required branch is checked out. The only baseline-untracked files were the Master-supplied TASK-018 record and plan directory; the primary checkout was not touched. |
| 2026-08-29T10:05:00+01:00 | Added the required focused tests before production code. | Direct Jest RED reported only the missing `AdminGuard`, `PlatformHealthService`, and `AdminHealthController` modules after local dependencies and Prisma generation were made available. |
| 2026-08-29T10:12:00+01:00 | Implemented the minimal authorization boundary and readiness service. | Added local active-admin check, guarded route, compact independent probes, R2 typed getters, and only `redis` plus `@aws-sdk/client-s3`. Public `GET /health` remains unchanged. |
| 2026-08-29T10:16:00+01:00 | Strengthened and mutation-tested security regressions. | The incomplete-R2 test failed as expected when the fail-closed condition was deliberately changed, then passed after restoration. A further RED/GREEN test removed a test-only runtime DI parameter so Nest resolves only Prisma and config. |
| 2026-08-29T10:30:00+01:00 | Prepared governed handoff records and freeze manifest. | Evidence omits all secret, provider, configuration, bucket, endpoint, object, and exception values. Independent review remains pending. |
| 2026-08-29T10:27:04+01:00 | Investigated the reviewer P1 readiness-timeout finding. | Confirmed `getStatus()` awaited raw dependency promises through `Promise.all`; no probe had a deadline and R2 `send` received no abort signal. |
| 2026-08-29T10:27:04+01:00 | Added timeout regressions before the production fix. | RED exited 1 because the test-required `probeTimeoutMs` dependency seam did not exist. The tests cover never-settling database, Redis, and R2 fakes and R2 abort propagation. |
| 2026-08-29T10:27:04+01:00 | Implemented the focused P1 remediation. | Every probe now has a bounded deadline; R2 receives an abort signal, timers are cleared, and Redis cleanup disconnects without awaiting a hung shutdown. The focused suite is green. |
| 2026-08-29T10:50:50+01:00 | Applied the fresh-review P1 follow-up test-first. | RED proved the production S3 adapter dropped abort options. The adapter now forwards them, fake request options are typed, and synchronous Redis close removes the lint violation without changing behavior. |
| 2026-08-29T10:59:26+01:00 | Applied the final fresh-review P1 lint follow-up. | Lint RED reported `no-unsafe-return` from the S3 command mock. The mock now explicitly maps `unknown` input to `unknown` output while the adapter-boundary assertion remains unchanged. |

## Files changed

- `apps/api/package.json`, `pnpm-lock.yaml`
- `apps/api/src/app.module.ts`, `apps/api/src/config/config.service.ts`
- `apps/api/src/auth/guards/admin.guard.ts`, `apps/api/src/auth/guards/admin.guard.spec.ts`
- `apps/api/src/health/admin-health.controller.ts`, `apps/api/src/health/admin-health.controller.spec.ts`
- `apps/api/src/health/platform-health.service.ts`, `apps/api/src/health/platform-health.service.spec.ts`
- `.agent/acceptance/{registry.yaml,traceability.md}`, `.agent/delivery-ledger.yaml`
- `.agent/memory/services/api.md`, `.agent/reports/progress/2026-08-29-platform-health.md`
- `.agent/reports/automation-runs/2026-08-29-task-018-platform-health.md`
- This task record and the TASK-018 review packet/freeze manifest.

## Evidence

- Tests: Original implementation RED/GREEN remains recorded. P1 timeout RED: `pnpm --filter @planote/api run test -- --runInBand src/health/platform-health.service.spec.ts` exited 1 because `PlatformHealthDependencies` did not declare the test-required configured deadline seam. Fresh-review P1 RED exited 1 because the real S3 adapter called `send(command)` without the asserted abort options. Green focused coverage passed 3 suites / 17 tests; it proves never-settling probes degrade only themselves, the probe receives an aborted R2 signal, and the real S3 adapter forwards that signal.
- Mutation evidence: changing the R2 configuration check to return true made the incomplete-R2 test fail with received `storage: ok` and overall `ok`; restoring the fail-closed check passed. Changing the test seam to require the new static factory produced the expected missing-factory RED; after the constructor-DI correction, that service suite passed 6/6.
- Full API tests: `pnpm --filter @planote/api run test -- --runInBand` exited 0 with 4 suites / 18 tests. The initial task-plan command without explicit `run` was rejected by pnpm before Jest (`Unknown option: runInBand`); the explicit form is the safe workspace equivalent.
- Type check: `pnpm --filter @planote/api run type-check` exit 0.
- Lint: initially exited 1 with exactly two unsafe fake-client option accesses and one unnecessary async Redis close; a final fresh-review rerun identified one `no-unsafe-return` S3 mock path. After the mock's explicit `unknown` input/return typing, `pnpm --filter @planote/api run lint` exit 0.
- Build: `pnpm --filter @planote/api run build` exit 0.
- Frozen install: `pnpm install --frozen-lockfile` exit 0 after pnpm regenerated the lockfile for the two allowed dependencies.
- Governance: `pnpm run agent:validate` exit 0; `pnpm run agent:test` exit 0 (32 passed / 0 failed).
- Integration/security/provider checks: owner-confirmed pre-dispatch bounded R2 list smoke only. This implementation agent deliberately made no provider call and records no sensitive value, endpoint, bucket, object, response, or credential.
- Frozen diff: `.agent/reviews/packets/TASK-018-freeze.md`.

## Review result

- Review report: pending fresh independent review of the P1-remediated freeze.
- Reviewer/model/effort: pending fresh independent gpt-5.6-terra / high review.
- Decision: pending.
- Open findings: the reviewer P1 deadline and production-adapter forwarding findings are locally remediated and routed for fresh independent confirmation; no other implementer decision is made here.

## Decisions and handoff

Model/effort routing is `gpt-5.6-terra` / `high`: the scoped change adds an
authorization boundary and external dependency probes. P1 remediation routing
remains `gpt-5.6-terra` / `high` because it bounds external I/O without
exposing provider state. Escalation: none. The
owner controls any production administrator provisioning; that user-data action
is outside scope. Commit and push remain forbidden until a fresh independent
reviewer returns the exact decision `approved` and all gates are green.

## Git result

- Commit: forbidden pending exact approval.
- Branch: `codex/task-018-platform-health`.
- Push: forbidden pending exact approval.
