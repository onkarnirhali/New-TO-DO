# Review Input Packet — TASK-018

- Frozen at: 2026-08-29T10:59:26+01:00
- Base commit: `f50394c57474cdf736eb43ea2a7ec6b00a958dfa`
- Branch/worktree: `codex/task-018-platform-health` / `C:\Users\onkar\.agents\worktrees\New Todo\platform-health`
- Frozen implementation manifest: `.agent/reviews/packets/TASK-018-freeze.md`
- Implementer routing: gpt-5.6-terra / high, because the task adds local
  authorization and server-side external dependency probes. Escalation: none.
- Review routing: fresh independent gpt-5.6-terra / high, required for
  acceptance, authorization, provider-boundary, and reproducibility review.
- Authority: read-only review only. Do not edit, self-approve, commit, push,
  merge, deploy, provision administrators, change user data, alter providers or
  configuration, access credentials, or issue provider calls.

## Acceptance-criterion mapping

| Criterion | Implementer evidence | Review question |
|---|---|---|
| AC-OPS-02 | Public `GET /health` remains public. `GET /admin/health` receives the existing Clerk authentication then `AdminGuard` requires an active local `isAdmin` user. `PlatformHealthService` returns only compact API/database/Redis/storage statuses, catches each dependency failure, destroys short-lived clients, and uses R2 `ListObjectsV2` with a one-object limit. Focused tests cover active/missing/inactive/non-admin authorization; all healthy and each failed dependency; incomplete R2 configuration; response secrecy; guarded route metadata; and Nest runtime-DI shape. | Does the exact frozen implementation enforce the authorization and secret-free readiness boundary without an unauthenticated bypass, provider/configuration disclosure, unsafe external call, or unnecessary scope? |

## P1 remediation routing

- Finding: `PlatformHealthService` could await a never-settling database, Redis,
  or R2 operation forever because its `Promise.all` probes had no deadline and
  R2 had no request cancellation.
- Evidence: source inspection confirmed the raw awaited calls; the test-first
  RED exited 1 because the configured timeout seam was absent.
- Remediation: every readiness probe is bounded; expiry maps only that check to
  `error`; R2 receives an abort signal; timer and client cleanup are safe; the
  response shape and public `/health` are unchanged.
- Fresh-review follow-up: the production adapter now forwards its `send`
  options to the S3 client. A direct adapter regression first failed because
  the options were omitted, then passed. The fake request options are typed and
  Redis cleanup is synchronous, leaving API lint clean without a rule change.
- Final fresh-review follow-up: lint RED identified an unsafe return in the
  mocked command constructor. Its input and return now explicitly use
  `unknown`; the production-adapter abort forwarding assertion is retained.
- Routing: focused P1 follow-up by `gpt-5.6-terra` / high; escalation none.
  A fresh independent `gpt-5.6-terra` / high review must decide whether this
  closes the P1. No commit or push is authorized by this packet.

## Frozen changed files

- `apps/api/package.json`, `pnpm-lock.yaml`
- `apps/api/src/app.module.ts`, `apps/api/src/config/config.service.ts`
- `apps/api/src/auth/guards/admin.guard.ts`, `apps/api/src/auth/guards/admin.guard.spec.ts`
- `apps/api/src/health/admin-health.controller.ts`, `apps/api/src/health/admin-health.controller.spec.ts`
- `apps/api/src/health/platform-health.service.ts`, `apps/api/src/health/platform-health.service.spec.ts`

Governed traceability and handoff records are `.agent/acceptance/registry.yaml`,
`.agent/acceptance/traceability.md`, `.agent/delivery-ledger.yaml`, the task
record, API service memory, progress report, automation-run record, and this
packet. Master-supplied plan files were untracked before implementation and are
not part of the frozen implementation manifest.

## Verification evidence

- RED: after local dependencies and the local Prisma client were generated, the
  direct focused Jest command exited 1 solely because the three new modules did
  not yet exist. The initial task-plan filtered-script invocation was rejected
  by pnpm before Jest (`Unknown option: runInBand`); the explicit script form
  below is the safe equivalent in this workspace.
- P1 timeout RED: `pnpm --filter @planote/api run test -- --runInBand
  src/health/platform-health.service.spec.ts` — exit 1 because the
  `probeTimeoutMs` test seam did not yet exist.
- GREEN (focused): `pnpm --filter @planote/api run test -- --runInBand
  src/auth/guards/admin.guard.spec.ts src/health/platform-health.service.spec.ts
  src/health/admin-health.controller.spec.ts` — exit 0, 3 suites / 17 tests.
- Full API tests: `pnpm --filter @planote/api run test -- --runInBand` — exit
  0, 4 suites / 18 tests.
- API lint/type-check/build: `pnpm --filter @planote/api run lint`, `pnpm
  --filter @planote/api run type-check`, and `pnpm --filter @planote/api run
  build` — each exit 0.
- Frozen install: `pnpm install --frozen-lockfile` — exit 0.
- Governance: `pnpm run agent:validate` — exit 0; `pnpm run agent:test` — 32
  passed / 0 failed.
- Mutation evidence: a temporary fail-open R2 configuration condition caused
  the added incomplete-R2 test to fail before the fail-closed code was restored.
  A second RED/GREEN change verifies the injected service has exactly two Nest
  runtime dependencies.
- Sensitive values omitted: no exception message, token, connection string,
  endpoint, account ID, bucket, object name, object metadata, provider response,
  or credential appears in this packet or manifest.
- Provider provenance: the owner confirmed a pre-dispatch bounded R2 list smoke;
  this agent made no provider call and did not access any configuration value.

## Reviewer request

Read `.agent/prompts/code-reviewer-agent.md`, the task record, master delivery
plan, platform-health design/plan, API service memory, this packet, the frozen
manifest, and the complete task-owned diff. Inspect AC-OPS-02 mapping,
authentication/authorization order, failure handling, response data minimisation,
dependency lifecycle, test adequacy, lockfile reproducibility, documentation,
and every quality gate. Confirm the P1 timeout remediation, deadline cleanup,
R2 abort behavior, and production adapter option forwarding. Return an
evidence-backed P0–P3 decision. Any decision
other than exact `approved` prohibits commit and push.
