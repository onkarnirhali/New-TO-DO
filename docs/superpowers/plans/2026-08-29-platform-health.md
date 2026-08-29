# Platform Health Endpoint Implementation Plan

> **For implementation:** Use the repository's governed task workflow. The implementation agent must work only on `codex/task-018-platform-health`, follow test-driven development, prepare the TASK-018 review packet, and stop before committing or pushing.

**Goal:** Deliver AC-OPS-02 as an authenticated, admin-only API readiness endpoint that reports the API, database, Redis, and configured Cloudflare R2 storage states without exposing credentials, provider configuration, errors, or object data.

**Architecture:** Keep the existing public `GET /health` heartbeat unchanged. Add `GET /admin/health`, protected by the existing global Clerk guard plus a new local-database `AdminGuard`. A small `PlatformHealthService` performs independent probes and reduces every dependency result to `ok` or `error`; the response is `ok` only when every check is `ok`.

**Tech Stack:** NestJS 11, Prisma/PostgreSQL, `redis`, AWS SDK v3 S3-compatible R2 client, Jest, pnpm.

## Scope and controls

- Task: `TASK-018-platform-health`; priority P1; acceptance criterion AC-OPS-02.
- Authorized implementation scope: `apps/api/src/auth/guards/admin.guard.ts`, `apps/api/src/health/**`, `apps/api/src/config/config.service.ts`, `apps/api/src/app.module.ts`, `apps/api/package.json`, `pnpm-lock.yaml`, and governed evidence/documentation records.
- Forbidden: changing the dirty primary checkout, database schema/migrations, Cloudflare configuration or credentials, production deployment, secrets, broad refactors, a web admin screen, object upload/listing UI, and commit/push before independent approval.
- The endpoint must never return error messages, exception text, tokens, account IDs, endpoint URLs, bucket names, object names, object metadata, or any R2 credential.

## Implementation steps

### 1. Establish failing behavior tests

Create `apps/api/src/auth/guards/admin.guard.spec.ts` and `apps/api/src/health/platform-health.service.spec.ts` first.

- Admin guard cases: an active local user with `isAdmin: true` proceeds; missing, inactive, and non-admin users each receive `ForbiddenException`.
- Health service cases: all probes healthy returns overall `ok`; each database, Redis, and storage failure independently produces only that check as `error` and overall `degraded`; response serialization contains only the documented `status` fields.
- Add `apps/api/src/health/admin-health.controller.spec.ts` to assert it delegates to the service and has the protected route behavior in the Nest module context.
- Run the focused Jest suite and record the initial failures in TASK-018 evidence.

### 2. Add the admin authorization boundary

Create `apps/api/src/auth/guards/admin.guard.ts`.

```ts
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const clerkId = request.user?.clerkId;
    const user = clerkId ? await this.usersService.findByClerkId(clerkId) : null;
    if (!user?.isActive || !user.isAdmin) {
      throw new ForbiddenException();
    }
    return true;
  }
}
```

Export `UsersService` from its module if necessary and use this guard only on the new admin controller. Do not mark the new route `@Public()`; the existing Clerk guard must authenticate first.

### 3. Implement independent, secret-safe readiness probes

Create `apps/api/src/health/platform-health.service.ts` and the accompanying response types.

- API check is fixed `{ status: "ok" }` once the request reaches the controller.
- Database probe executes `SELECT 1` through Prisma.
- Redis probe creates a short-lived client using the configured Redis URL, connects, sends `PING`, and closes the client in `finally`.
- R2 probe is skipped as `error` when any required R2 setting is absent. Otherwise create an S3-compatible client with `region: "auto"`, the derived Cloudflare R2 endpoint, and configured credentials; issue `ListObjectsV2` with `MaxKeys: 1`; always destroy the client in `finally`.
- Execute dependency probes independently (for example with `Promise.all` plus a catch-to-status helper). Catch errors at the probe boundary and return only `"error"`; do not log or rethrow provider error details.

Add narrowly scoped R2 configuration getters to `apps/api/src/config/config.service.ts` rather than reading `process.env` directly.

### 4. Expose the protected endpoint without changing the public heartbeat

Create `apps/api/src/health/admin-health.controller.ts`:

```ts
@Controller("admin/health")
@UseGuards(AdminGuard)
export class AdminHealthController {
  constructor(private readonly health: PlatformHealthService) {}

  @Get()
  check(): Promise<PlatformHealthResponse> {
    return this.health.getStatus();
  }
}
```

Register the new controller and service in `apps/api/src/app.module.ts`. Leave `GET /health` as its existing public compatibility heartbeat.

### 5. Add runtime dependencies and pass focused tests

Add only `redis` and `@aws-sdk/client-s3` to `apps/api/package.json`, update `pnpm-lock.yaml` through pnpm, and run:

```powershell
pnpm --filter @new-todo/api test -- --runInBand
pnpm --filter @new-todo/api lint
pnpm --filter @new-todo/api typecheck
pnpm --filter @new-todo/api build
```

If a command fails, fix the smallest cause within scope and rerun it. Do not silence or weaken tests.

### 6. Create complete governed evidence and freeze the handoff

Create/update the TASK-018 task record, acceptance/traceability/ledger entries, task-specific review packet, verification evidence, service memory, automation-run record, and `CONVERSATION_MEMORY.md` in accordance with `.agent` governance. Record:

- model `gpt-5.6-terra`, effort `high`, and rationale: implementation touches authorization and external dependency probes;
- separate real provider smoke evidence as safe `ListObjectsV2(MaxKeys=1)` only, never credentials or endpoint values;
- file allowlist, commands, acceptance mapping, omitted sensitive values, known limitation that enabling a production administrator account is owner-controlled;
- frozen commit candidate diff and stop condition: no commit/push until a fresh independent reviewer gives exact approval and all gates are green.

### 7. Independent review, only P0/P1 remediation, and delivery

The controller must supply the frozen diff and complete packet to a new, read-only `gpt-5.6-terra / high` reviewer using `.agent/prompts/code-reviewer-agent.md`. The reviewer checks acceptance criteria, authorization, safe error handling, simplicity, tests, dependencies, documentation, and all quality gates.

- Any decision other than exact approval forbids commit/push.
- Only P0/P1 issues may trigger a focused follow-up implementation task; rerun review afterward.
- After exact approval, rerun the required gates plus `git diff --check`, commit only the approved files on `codex/task-018-platform-health`, push that non-protected branch, and record commit/push evidence.

## Verification checklist

1. Public `GET /health` regression stays compatible.
2. Unauthenticated `GET /admin/health` is denied by Clerk authentication.
3. Authenticated non-admin, inactive, and missing-local users are denied with safe `403`.
4. An authenticated active admin gets only the compact status response.
5. Database, Redis, and R2 failures degrade independently and reveal no detail.
6. A real scoped R2 credential performs the bounded `ListObjectsV2(MaxKeys=1)` smoke successfully, with sensitive values withheld from records.
7. Focused API tests, API lint, typecheck, build, and governed validation pass.
