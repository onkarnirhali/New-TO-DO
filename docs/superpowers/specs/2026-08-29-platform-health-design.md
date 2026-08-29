# Platform Health Delivery Design

## Decision

Implement an admin-only API health endpoint at `GET /admin/health`.
Authentication remains the existing Clerk guard. A dedicated `AdminGuard` loads
the caller by Clerk ID and permits the endpoint only when the existing
`User.isAdmin` flag is true. Missing users and non-admin users receive the same
safe `403 Forbidden` response.

The endpoint returns a compact, secret-free readiness document:

```json
{
  "status": "ok | degraded",
  "checks": {
    "api": { "status": "ok" },
    "database": { "status": "ok | error" },
    "redis": { "status": "ok | error" },
    "storage": { "status": "ok | error" }
  }
}
```

No exception messages, connection strings, tokens, bucket names, endpoints,
object names, or provider responses are returned. A failed dependency changes
only its check to `error` and makes the overall status `degraded`; the endpoint
still responds so an administrator can diagnose which dependency failed.

## Components and data flow

1. `AdminGuard` reads the verified Clerk subject already placed on the request,
   resolves the local user by `clerkId`, and checks `isAdmin`.
2. `PlatformHealthService` evaluates API (in-process), PostgreSQL via Prisma,
   Redis via a minimally scoped ping, and R2 via a one-object-limit list
   operation.
3. `AdminHealthController` returns only the normalized statuses.

The health service owns dependency probes; the controller owns HTTP response
shape; the guard owns authorization. The task adds no schema, provider,
credential, billing, deployment, or object mutation change.

## Error handling and security

- Unauthenticated callers remain rejected by the global Clerk guard.
- Authenticated non-admin callers are forbidden before any probe runs.
- Dependency errors are caught per probe and mapped to `error` without logging
  sensitive provider data.
- R2 uses server-only ignored local configuration; browser code never receives
  R2 credentials or an R2 URL.
- Tests use mocks and assert that the response contains no secret-bearing
  configuration values.

## Verification

- Test-first unit/controller coverage proves authorization, all-healthy output,
  partial failure behavior, and secret-free response mapping.
- A real local smoke test confirms the existing database, Redis, and R2
  readiness dependencies. It does not expose credentials.
- API test, lint, type-check, build, governance validation/tests, diff check,
  frozen reviewer packet, and fresh independent Terra/high review are required.

## Scope boundary

This task implements AC-OPS-02 only. It does not build an admin web UI,
user-management controls, monitoring/retry infrastructure, or R2 attachment
uploads; those remain separate acceptance criteria.
