# API Service Memory

## Dashboards

- `DashboardsService.create` writes an owned dashboard and its exact three
  starter columns through one nested Prisma `dashboard.create` operation:
  `To Do` at `0`, `In Progress` at `10`, and `Done` at `20`.
- `dashboards.service.spec.ts` is a focused service-level regression test. It
  asserts the atomic nested-write contract without connecting to a database or
  any external provider.
- API unit tests run with Jest and `ts-jest`; `tsconfig.build.json` excludes
  `*.spec.ts` so the production Nest build remains source-only.

## Platform health

- Public `GET /health` remains the compatibility heartbeat. `GET /admin/health`
  is authenticated by the global Clerk guard and then requires an active local
  `User.isAdmin` record through `AdminGuard`; missing, inactive, and non-admin
  callers receive the same `403` without any readiness probe running.
- `PlatformHealthService` reports only `ok` or `error` for API, PostgreSQL,
  Redis, and R2. Dependency exceptions, R2 configuration, provider responses,
  object information, and credentials are intentionally neither logged nor
  returned. R2 uses a bounded `ListObjectsV2` request with `MaxKeys: 1` and is
  fail-closed when its server-side configuration is incomplete.
- Each PostgreSQL, Redis, and R2 probe is deadline-bounded. Deadline expiry
  becomes only that probe's compact `error`; R2 receives an abort signal, all
  timers are cleared, and the short-lived Redis client is disconnected without
  awaiting an unbounded close.
- The R2 adapter forwards the abort options to the underlying AWS SDK S3
  `send` call; a regression test exercises that production adapter boundary.
  Its command constructor mock uses explicit `unknown` input/return types so
  the test boundary remains lint-safe.
- Focused unit coverage lives in `auth/guards/admin.guard.spec.ts` and the
  `health` directory. The service has only Prisma and typed configuration as
  Nest dependencies; `forTesting` supplies probe fakes without altering runtime
  dependency injection.
