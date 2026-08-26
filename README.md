# Planote

Planote is a premium, cross-platform productivity app that brings Kanban task
management and rich notes together in one workspace.

## What it is building

- Multiple dashboards with configurable Kanban columns and drag-and-drop tasks.
- Rich notes that can be independent or linked to tasks.
- Google and email authentication through Clerk.
- Time-based reminders across platforms, with location reminders planned for the
  paid mobile experience.
- A freemium model: core tasks and notes are free; AI, location, and advanced
  note features are paid.

## Technology

| Area | Technology |
|---|---|
| Web | Next.js, TypeScript, Tailwind CSS |
| Mobile | React Native and Expo |
| API | NestJS |
| Data | PostgreSQL, Prisma, Neon |
| Authentication | Clerk |
| Workspace | pnpm and Turborepo |

## Repository layout

```text
apps/
  api/       NestJS API
  web/       Next.js web application
  mobile/    React Native / Expo application
packages/    Shared workspace packages
docs/        Product, design, and delivery documentation
```

## Local development

Requirements: Node.js 20+, pnpm 9+.

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm lint
pnpm type-check
pnpm test
pnpm build
```

Configuration examples live in the application `.env.example` files. Never
commit real credentials.

## Current status

The monorepo and core backend APIs are in place. The web experience has an app
shell and authentication UI, while end-to-end Clerk authentication, dashboard
and task workflows, notes, reminders, and release verification remain active
delivery work.

The project uses a documented Master Delivery Agent and independent Code
Reviewer Agent design. Their purpose is to track acceptance criteria, require
evidence, preserve an audit trail, and prevent unreviewed changes from being
treated as complete.

## Project documentation

- [Planning index](docs/planning/PLANNING_INDEX.md)
- [Master delivery plan](docs/planning/07-master-delivery-plan.md)
- [Master and reviewer agent design](docs/superpowers/specs/2026-08-25-master-delivery-agent-design.md)

## Safety and delivery policy

Every implementation task must be linked to acceptance criteria, have
verification evidence, receive independent review, and be documented. External
irreversible actions—including deployments, credential changes, payments,
deleting live data, and protected-branch merges—require project-owner approval.
