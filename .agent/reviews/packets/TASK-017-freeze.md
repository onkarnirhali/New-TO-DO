# Frozen Implementation Manifest — TASK-017

- Frozen at: 2026-08-28T21:29:00+01:00
- Base commit: `4ee22c055b6258fa09d05d67e87ae192f6c4ca5e`
- Branch/worktree: `codex/task-017-dashboard-default-columns` / `C:\Users\onkar\.agents\worktrees\New Todo\dashboard-default-columns`
- Scope: implementation and API test-infrastructure files only.
- Freeze hash: `37e4e3e9104baffc600de8d8493b742b9bb0f7ab627a58a859dca35c8a0a4639`

The freeze hash is the SHA-256 digest of the newline-terminated manifest below.
It intentionally excludes task/service-memory/reviewer packet documentation so
the reviewer can record a decision without changing the immutable implementation
scope. This revision adds the pnpm-generated lockfile required by
`REVIEW-TASK-017-001`; `.agent/delivery-ledger.yaml` remains a pre-existing
Master-dispatch change and is excluded from this implementation manifest.

## File hashes

```text
be4dfb623db8c89ce1a725f47207a7768a126ffed431050eb32d4af2f749b95c  apps/api/package.json
9f09520f315b8dc968dbfee0d3eb55d996a20e10fb3628822966d50d4b3524be  apps/api/jest.config.cjs
2a310869d7ceaba918ec84bf7064613495e1a594be1bdad5f56b740021e5b4ed  apps/api/tsconfig.build.json
571f7760f530b8c09f5384fdb7c83799b49221ea595504c5cab4a4b0effab2c2  apps/api/nest-cli.json
7a0436e8c3ea8db0d65a3090f6560505555ed18ae4bea8f08a944bed98ee6e03  apps/api/src/dashboards/dashboards.service.ts
412af0f99f3d606c84d7c3261d8a183de22286867ba1da5f31c98d677c12e1dd  apps/api/src/dashboards/dashboards.service.spec.ts
e2f5ca196fcddc6cb357a8fe8627415ce91e391367f842ad160c6ee9a1f87db1  pnpm-lock.yaml
```

## Reproduction

```powershell
Get-FileHash -Algorithm SHA256 apps/api/package.json,apps/api/jest.config.cjs,apps/api/tsconfig.build.json,apps/api/nest-cli.json,apps/api/src/dashboards/dashboards.service.ts,apps/api/src/dashboards/dashboards.service.spec.ts,pnpm-lock.yaml
pnpm install --lockfile-only --frozen-lockfile
git diff --check
```
