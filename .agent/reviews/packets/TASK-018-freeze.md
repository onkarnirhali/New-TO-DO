# Frozen Implementation Manifest — TASK-018

- Frozen at: 2026-08-29T10:59:26+01:00
- Base commit: `f50394c57474cdf736eb43ea2a7ec6b00a958dfa`
- Branch/worktree: `codex/task-018-platform-health` / `C:\Users\onkar\.agents\worktrees\New Todo\platform-health`
- Scope: admin health implementation, focused tests, and the two required
  runtime dependency declarations only.
- Freeze hash: `936659664c2fe17c9f577118727a0a794c5a7e8f4458f96910627eaeb3b138e1`

The freeze hash is SHA-256 of the newline-terminated file-hash manifest below.
It deliberately excludes governed task, progress, service-memory, automation,
and reviewer documentation so a reviewer can record a decision without changing
the immutable implementation scope. It also excludes Master-supplied untracked
planning files that predate implementation.

## File hashes

```text
f67a4731936aba7ba29eecb9398b2208042e8a56b04cbc0eeccaaaae8062aa87  apps/api/package.json
0d218fbe8a8ea83a8d7744479d591185b13979173ee8709362e4a84e1a47cedf  pnpm-lock.yaml
a913108b28bb32d237c0db7c57f009061333980db92e887ea6d90447d552ac4c  apps/api/src/app.module.ts
bc931f1629822e4c743f638e07f6c9d8de5fb502585741b6162272e147ee3335  apps/api/src/config/config.service.ts
31c7928b73dfb81e32ec3228a7ff7a35aac579204468fc3896b33d434081bc76  apps/api/src/auth/guards/admin.guard.ts
e2e757bef23f5c0299953617c5ab46340197dffa7c9bfb0e6e924d9049cf6bf1  apps/api/src/auth/guards/admin.guard.spec.ts
c633fcaaf374601c50bd92e6d267c84983fbf27c338270632f8357b0889de29f  apps/api/src/health/admin-health.controller.ts
19293ada4c3c6783d0718a1ac2b71b13c44d2dac4c26e3af9dd0ae635971dbbd  apps/api/src/health/admin-health.controller.spec.ts
5c29fa66ea6a4a86fcef3baa8088dac859121f25862c5c2d946c799fe6fbdd72  apps/api/src/health/platform-health.service.ts
c1fdeca91e34fa7d362661ca01d7cc360c8a84c4f95348fb097b5b08b74e691e  apps/api/src/health/platform-health.service.spec.ts
```

## Reproduction

```powershell
Get-FileHash -Algorithm SHA256 apps/api/package.json,pnpm-lock.yaml,apps/api/src/app.module.ts,apps/api/src/config/config.service.ts,apps/api/src/auth/guards/admin.guard.ts,apps/api/src/auth/guards/admin.guard.spec.ts,apps/api/src/health/admin-health.controller.ts,apps/api/src/health/admin-health.controller.spec.ts,apps/api/src/health/platform-health.service.ts,apps/api/src/health/platform-health.service.spec.ts
pnpm install --frozen-lockfile
pnpm --filter @planote/api run test -- --runInBand
pnpm --filter @planote/api run lint
pnpm --filter @planote/api run type-check
pnpm --filter @planote/api run build
pnpm run agent:validate
pnpm run agent:test
git diff --check
```
