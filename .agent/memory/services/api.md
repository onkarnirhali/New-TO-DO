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
