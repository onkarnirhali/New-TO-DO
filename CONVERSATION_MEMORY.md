# Shared Conversation Memory

> All AI agents must read this file at the start of every session and update it before ending.
> Protocol defined in: `AGENTS.md`
> Planning docs index: `new-todo/project/uploads/PLANNING_INDEX.md`

---

## Project Overview

**Name:** Planote
**Tagline concept:** Plan + Note — unified productivity
**Goal:** Premium cross-platform To-Do + Note-taking app. Kanban task management unified with rich-text notes. Cloud-native, freemium, agentic AI.
**Status:** Implementation in progress — monorepo and core backend APIs are implemented; the web frontend is still at the shell/auth-UI stage and is not wired end to end. The three-hour Master Delivery Agent Automation has an independently approved governance bootstrap on its isolated branch; the primary checkout remains preserved and product work proceeds only through governed worktrees.

---

## Decisions Summary (Quick Reference)

### App Identity
| Item | Decision |
|------|-----------|
| App name | **Planote** |
| App type | Premium To-Do + Note-taking productivity app |
| Infrastructure | Cloud-native |
| AI | Agentic AI capabilities |
| Collaboration | Solo at launch; team collaboration in future releases |
| Offline support | Yes (mobile) |
| Due date label | "Due Date" |

### Target Platforms
| Platform | Status |
|----------|--------|
| Web App | Confirmed |
| iOS | Confirmed |
| Android | Confirmed |
| iPadOS | Confirmed |
| Chrome Extension | Deferred — only if adoption warrants it |

### Target Users
| Segment | Description |
|---------|-------------|
| Power users | Developers, designers, consultants |
| General consumers | Todoist / Apple Notes replacement audience |
| Students | Note-heavy, cross-subject organisation |

### Differentiators
| # | Differentiator |
|---|----------------|
| 1 | Kanban + Notes unified in one polished app |
| 2 | Location-aware reminders (GPS proximity-triggered) |
| 3 | Premium design — cleaner than Notion, more powerful than Apple Notes |

### Freemium Model — Option C (DECIDED)
| Tier | Includes |
|------|----------|
| **Free** | Unlimited dashboards, tasks, notes, basic rich text, time-based reminders, image embed, offline sync, all platforms |
| **Paid** | AI features (rephrase, OCR, speech-to-text, agents), location reminders, password-protected notes, text wrap + image resize + captions, priority support |

**Downgrade policy:** Never delete data. Always pause, preserve, restore. See `new-todo/project/uploads/04-freemium-model.md` for full policies.

### Tech Stack (DECIDED — see `new-todo/project/uploads/03-tech-stack.md`)
| Layer | Technology |
|-------|-----------|
| Web frontend | Next.js 14+ (App Router) |
| Mobile | React Native + Expo |
| Monorepo | Turborepo |
| Styling — web | Tailwind CSS |
| Styling — mobile | NativeWind |
| State management | Zustand + TanStack Query |
| Backend | **NestJS** |
| ORM | Prisma |
| Database | **PostgreSQL on Neon** |
| Cache + sessions | Redis on Upstash |
| Auth | **Clerk** (Google OAuth + JWT + admin UI; 10k MAU free) |
| Realtime | Socket.io (inside NestJS) |
| File storage | Cloudflare R2 |
| Offline sync | MMKV + sync queue |
| Rich text editor | TipTap (extension-based feature gating) |
| Kanban DnD | @dnd-kit |
| Push notifications | Expo + FCM + APNs |
| Location | Expo Location |
| AI — Rephrase | Claude API (Anthropic) |
| AI — Speech-to-text | OpenAI Whisper |
| AI — OCR | Google Cloud Vision |
| Web deploy | Vercel (Next.js) + Railway (NestJS) |
| Mobile deploy | EAS (Expo Application Services) |
| Payments — mobile | RevenueCat |
| Payments — web | **Razorpay** (UPI, cards, net banking, recurring) |

**Key decisions:** Supabase was rejected in favour of full control (Neon + NestJS + Clerk separately). Clerk chosen over custom auth for React Native SDK + built-in admin UI.

### UI & Design System (DECIDED — see `new-todo/project/uploads/05-ui-ux-design.md`)
| Decision | Value |
|----------|-------|
| Design direction | **Bold & Modern** — Linear/Raycast/Vercel inspired |
| Dark mode | Primary/hero experience |
| Light mode | Equally polished, not an afterthought |
| Design density | Medium — comfortable for consumers, rich for power users |
| Typography | Inter (geometric sans) |
| Accent | Violet → Indigo gradient (#7C3AED → #4F46E5) |
| Base unit | 4px |
| Card radius | 8px |
| Modal radius | 12px |

**Dark palette:** `#0C0C11` base · `#12121A` surface · `#1A1A26` elevated · `#22223A` overlay · `#2A2A40` border
**Light palette:** `#F4F4F8` base · `#FFFFFF` surface · `#F0F0F7` elevated · `#E8E8F0` overlay · `#E2E2EC` border

### Design Prototype (COMPLETE)
A full design has been built by Claude Design. Located in `new-todo/project/`.

| Section | Screens |
|---------|---------|
| Auth | Login, Sign Up, Forgot Password + Success (dark + light) |
| Onboarding | 3-step wizard: Welcome, Dashboard setup, Theme picker |
| Web Dashboard | Full 1440px Kanban board — all 4 task card variants |
| Task Flows | Creation modal (progressive disclosure) + Detail panel |
| Notes | 4-col grid (locked/unlocked) + Full rich-text editor |
| Mobile | 5 screens × 2 modes + Location reminder sheet |
| Paywall | Inline prompt + Full subscription/pricing page + Settings |
| Components | Admin panel, Toast variants, Empty states |

---

## Confirmed Features

| Area | Feature |
|------|---------|
| **Auth** | Email registration + password reset |
| **Auth** | Google OAuth |
| **Auth** | Profile photo (upload or from Google) |
| **Admin** | Activate / deactivate users, view active/inactive users, platform health |
| **Nav** | Left nav — context-sensitive (dashboards list or notes tree) |
| **Nav** | Top nav — profile avatar + dropdown; centre toggle Dashboard ↔ Notes |
| **Dashboard** | Multiple dashboards, custom labels, configurable Kanban columns |
| **Dashboard** | Drag tasks across columns |
| **Tasks** | Created from dashboard; scope to one or share across multiple |
| **Tasks** | Link/unlink to note; create note from task (opens modal) |
| **Tasks** | Title (required), Description (optional), Due Date |
| **Tasks** | Time-based reminders (all platforms) |
| **Tasks** | Location-based reminders — GPS + radius (mobile, paid) |
| **Tasks** | Speech-to-text input (mobile, paid) |
| **Tasks** | AI OCR image-to-text (mobile, paid) |
| **Notes** | Independent or linked to task |
| **Notes** | Password protection (paid) |
| **Notes** | 4×4 grid view; locked notes show lock icon |
| **Notes** | Rich text: bold, italic, underline, H1/H2/H3, code, lists, image embed |
| **Notes** | Text wrap + image resize + captions (paid) |
| **Notes** | AI Rephrase — full note or selected text (paid) |
| **Data** | All data strictly user-specific |
| **DB schema** | `contains_premium_content` boolean on notes from day one |

---

## Open Questions

- [ ] UX flows — Dashboard, Task creation, Notes (detailed flows not yet specified)
- [ ] Onboarding flow detail
- [ ] Icon set — Lucide vs Heroicons vs Phosphor
- [ ] Font delivery — Google Fonts vs self-hosted Inter
- [ ] AI provider pricing / usage limits

---

## In-Progress Work

| Task | Owner | Status |
|------|-------|--------|
| Governance lifecycle reconciliation (TASK-011) | Master Delivery Agent | Exact independent approval received; focused commit/push is the remaining task action. |
| Web frontend (Next.js) wired to real backend | Claude (autonomous loop) | App shell (top nav + sidebar) done with static placeholder data. Still needed: Clerk auth pages, real Kanban board wired to the Tasks/Dashboards API, Notes grid/editor, settings — none of these are built yet. |
| Mobile app (Expo/React Native) | — | Not started — deferred until backend + web are solid |

---

## Completed Milestones

- [2026-05-19] Web app shell built: `TopNav` + `Sidebar` + `AppShell` (`apps/web/src/components/layout/`), plus reusable primitives `Wordmark`/`Avatar`/`Tag`/`Button` (`apps/web/src/components/ui/`), rendered at the new `/app` route with a placeholder content area. Converted from the `new-todo/project/planote-*.jsx` inline-style prototype into proper Tailwind components using the design tokens already configured in `tailwind.config.ts`. Added `lucide-react` for icons (the prototype's `Icon name="..."` calls all match Lucide's icon names, confirming that was the intended library). Also set `<html className="dark">` as the default in the root layout — per `05-ui-ux-design.md` dark is supposed to be the primary/hero experience, but nothing was setting it and the app was silently defaulting to light; a real user-toggleable theme preference is still a separate future piece. Fixed a real pre-existing CSS bug found along the way: the global `* { border-color }` reset was hardcoded to the dark-mode border color always, breaking light-mode borders anywhere the bare `border` utility is used — changed to `var(--border)`. Verified with `pnpm lint`/`type-check`/`build` (all clean) plus an actual visual check: built, served, and screenshotted both `/` and `/app` in a real browser (via the agent-browser skill) to confirm dark mode renders correctly, not just that it compiles.
- [2026-05-19] `apps/web` build fixed: `next.config.ts` isn't supported by the installed Next.js 14.2.35 (TS config files need Next 15+) — converted to `next.config.mjs`, wired up the previously-unused shared `@planote/config/eslint/next` config (apps/web had no ESLint config file at all, same gap as apps/api had), and added the standard `next-env.d.ts`/`*.tsbuildinfo` entries to `.gitignore`. `pnpm lint`, `pnpm type-check`, and `pnpm build` are now all green across the whole monorepo for the first time. Verified with a live `next start` smoke test — real "Planote" landing page renders.
- [2026-05-19] Milestone 6 — Notes API: CRUD, password protection (bcrypt hash, set/remove/unlock endpoints that scrub content for locked notes until unlocked), task linking (`POST`/`DELETE /notes/:id/tasks/:taskId`, FK lives on Task). Verified via lint + type-check + `nest build` + a live boot smoke test (routes registered, 401 without token, DB connects).
- [2026-05-19] Milestone 5 — Tasks API confirmed complete (full CRUD, move, cross-dashboard sharing, reminders was already implemented in code; this session just caught the memory log up to reality and verified it builds).
- [2026-05-15] Full design prototype built by Claude Design (8 sections, 40+ artboards)
- [2026-05-15] Tech stack fully decided (NestJS + Neon + Clerk + Razorpay + RevenueCat)
- [2026-05-15] Freemium model finalised (Option C)
- [2026-05-15] Design system tokens fully specified
- [2026-05-13] App name decided: Planote
- [2026-05-13] Feature scope, target users, differentiators defined
- [2026-05-05] Shared agent memory protocol established

---

## Known Issues / Blockers

- **Local PostgreSQL port conflict:** This machine has two local PostgreSQL instances on ports 5432 and 5433. Planote's Docker Postgres is mapped to **port 15432** to avoid collision. `DATABASE_URL` must use `localhost:15432`.

- Visual companion server is localhost-only — must be restarted each session. Run:
  ```bash
  bash "C:/Users/onkar/.claude/skills/brainstorming/scripts/start-server.sh" --project-dir "c:/Data/Projects/New Todo"
  ```
  Then read URL from newest `.superpowers/brainstorm/<session>/state/server-info`

- **No test framework configured for `apps/api`:** no Jest setup, no `.spec.ts` files, no `test` script in `apps/api/package.json` (root `pnpm test` will no-op or fail for this package). Verification so far has relied on lint + type-check + `nest build` + manual boot/curl smoke tests. Worth setting up Jest + a Prisma test-db strategy before backend logic gets much more complex.

- **No real third-party credentials configured:** `apps/api/.env` only has placeholder values (`CLERK_SECRET_KEY=sk_test_...`, empty R2/AI keys). The app boots and route guards work (verified: protected routes correctly 401 without a token), but no real end-to-end request against Clerk, Neon, Razorpay, RevenueCat, Cloudflare R2, or the AI providers has been (or can be) tested locally.

- **No theme toggle yet:** dark mode is hardcoded as the default (`<html className="dark">` in `apps/web/src/app/layout.tsx`) since nothing was setting a theme at all before. There's no light/dark switcher UI, no persistence (localStorage), and no system-preference detection. Both palettes exist and work (verified visually), just no way for a user to switch yet.

- **Ports 3001/3002/3004 are occupied by unrelated processes on this dev machine** — not Planote's. Use an uncommon port (e.g. 34567) for local smoke tests instead of assuming the 3000 range is free.

---

## Session Log

> Newest entries first.

### [2026-08-27] Agent: Codex | Model: gpt-5.6-terra
**Did:** Added the owner-approved 90-minute sprint and release-candidate reporting contract, then activated the unchanged three-hour Codex automation after independent approval.
**Changed:** Master prompt, automation manifest/setup, progress template, validator/tests, TASK-013 records, and this session entry in `codex/task-013-sprint-delivery-reporting`.
**Next:** The next sprint first preflights real Clerk test readiness; if ready, it finishes auth browser/build proof and review, otherwise it reports the exact owner help needed.
**Notes:** Terra/high used TDD, Luna/medium ran routine gates, and Terra/high V2 review returned exact `approved` with P0/P1/P2/P3 = 0/0/0/0. The dirty primary/auth worktree remains untouched.

### [2026-08-26] Agent: Codex | Model: gpt-5.6-terra
**Did:** Reconciled TASK-001–TASK-010, AC-GOV-01–03, and M0 from approved immutable reviews and Git evidence in an isolated worktree. An independent first review found a P1 in the frozen-snapshot proof; the revision-2 byte-framed command reproduced its hash twice and a fresh independent Terra/high review returned exact `approved` with no findings.
**Changed:** Governance ledger/registry, task lifecycle records, lifecycle plan/reports, review packets/reports, product memory, and this shared memory.
**Next:** Re-run final gates, commit and push only TASK-011 to `codex/governance-record-reconciliation`, then plan web test infrastructure.
**Notes:** M1 still has 31 web launch-blocker criteria unverified. The dirty primary checkout remains preserved; no merge, deployment, credential, payment, or live-data action occurred.

### [2026-08-26] Agent: Codex | Model: gpt-5.6-terra
**Did:** Reconciled M0 governance, TASK-001–TASK-010, and AC-GOV-01–AC-GOV-03 from immutable approved reviews, reachable commits, and confirmed tracking branches without rewriting historic reports or inventing per-task commit ownership. Initial TASK-011 review found a P1 in frozen-snapshot reproducibility; revision-2 packet remediation was prepared.
**Changed:** Governance ledger/registry, TASK-001–TASK-011 lifecycle records, product memory, reconciliation reports/plan, historical and revision-2 reviewer input packets, and this memory record.
**Next:** Fresh independent Terra/high review of TASK-011 revision 2; after that gate, begin web test infrastructure.
**Notes:** M1 still has 31 web launch-blocker criteria unverified. The dirty primary checkout remains preserved. TASK-011 itself is not approved, verified, committed, or pushed.

### [2026-08-26] Agent: Codex | Model: gpt-5.6-terra
**Did:** Added and mechanically enforced product-first planning controls in the Master Delivery Agent contract: each plan now targets the highest-priority ready criterion, one user-visible outcome, a small file scope, explicit dependencies, and a verification stop condition; mobile, billing, and AI remain deferred.
**Changed:** `.agent/prompts/master-delivery-agent.md`, governance validator/tests, TASK-010 ledger/task/review records, `CONVERSATION_MEMORY.md`.
**Next:** Commit and push the independently approved TASK-010 change on `codex/governance-bootstrap`; then choose the next web-foundation criterion.
**Notes:** Three fresh independent Terra/high reviews were recorded. Initial P1 findings on enforcement and traceability were remediated; final REVIEW-TASK-010-003 approved with no P0–P3 findings. Fresh governance tests pass 32/32; root lint/type-check/build pass with 10 known web warnings; root test has no configured package tasks.

### [2026-08-26] Agent: Codex | Model: gpt-5.6-terra
**Did:** Remediated TASK-009 lifecycle traceability in the isolated governance worktree. Added red/green fixture coverage for missing task records, task-ID/acceptance mismatch, missing escalation, and generic model routes; connected ledger task records to repository validation; reconciled historical evidence honestly; and prepared the initial P1 review record.
**Changed:** `scripts/validate-agent-governance.{mjs,test.mjs}`, `.agent/delivery-ledger.yaml`, TASK-001–TASK-009 records, `.agent/reviews/**`, and this memory record.
**Next:** Freeze V4 reviewer handoff and obtain a fresh independent `gpt-5.6-terra` / high task-level decision. No task is approved, verified, committed, or pushed by this work.
**Notes:** Red run: 24 passed / 5 failed with expected missing-rejection assertions; green run: 29 passed / 0 failed. Final local gates passed; lint/build retain 10 existing web return-type warnings and root `pnpm test` has zero configured tasks.

### [2026-08-26] Agent: Codex | Model: gpt-5.6-terra
**Did:** Enforced the owner’s routing refinement in all executable role contracts: Terra/ultra for plans and major decisions, Terra/high for every implementation and independent review, and Luna/medium only for documented routine verification.
**Changed:** `.agent/prompts/*`, `.agent/skills/promoted/*`, `.agent/memory/product.md`, `scripts/validate-agent-governance.*`; active Master Delivery automation now runs Terra/ultra.
**Next:** Refresh the frozen reviewer packet to include this routing change, obtain fresh independent Terra/high approval, then rerun gates and commit only exact-approved work.
**Notes:** The validator now rejects any role contract that omits one of the three required routes and still rejects Sol routing. Luna verification is explicitly non-implementing and non-approving.

### [2026-08-26] Agent: Codex | Model: gpt-5.6-terra
**Did:** Completed the repository-owned governance bootstrap implementation in an isolated worktree: policies, registry/ledger, templates, role prompts, skill lifecycle, automation contract, validator, baseline reports, and reviewer packets. Updated routing to Terra/Luna only and the active automation to Terra/high.
**Changed:** `.agent/**`, root `package.json`, `pnpm-lock.yaml`, `scripts/validate-agent-governance.*`, and `CONVERSATION_MEMORY.md` on `codex/governance-bootstrap`; primary checkout untouched.
**Next:** Obtain fresh independent Terra/high review for TASK-001–008, then rerun gates, commit, and push only exact-approved work.
**Notes:** Governance tests pass 23/23; lint/type/build pass with 10 existing web warnings; root test has zero configured tasks. Three reviewer attempts were blocked by an account usage limit, so no review decision or commit/push exists.

### [2026-08-26] Agent: Codex | Model: gpt-5.6-sol
**Did:** Merged the approved Code Reviewer Agent contract into `main`, pushed it, and began the isolated governance bootstrap. Implemented TASK-002 governance policies and a presence validator test-first.
**Changed:** `.agent/governance/*`, `.agent/tasks/TASK-002-governance-invariants.md`, `scripts/validate-agent-governance.*`, `CONVERSATION_MEMORY.md`.
**Next:** Obtain independent review for TASK-002 before commit/push; then add acceptance registry and delivery ledger.
**Notes:** Primary workspace user changes remain untouched. `pnpm test` baseline ran successfully but has zero discovered package tests.

### [2026-08-26] Agent: Codex | Model: gpt-5.6-sol
**Did:** Connected the project to the owner-created private GitHub repository and added the root README on an isolated branch.
**Changed:** `README.md`, `CONVERSATION_MEMORY.md`.
**Next:** Push the README commit to the remote `main` branch and retain its source branch for traceability.
**Notes:** Only committed history is being pushed; pre-existing uncommitted work in the primary workspace remains local.

### [2026-08-25] Agent: Codex | Model: gpt-5.6-sol
**Did:** Created the repository-owned Code Reviewer Agent prompt, review template, bootstrap index, and auditable task record in an isolated worktree.
**Changed:** `.agent/README.md`, `.agent/prompts/code-reviewer-agent.md`, `.agent/templates/code-review.md`, `.agent/tasks/TASK-001-code-reviewer-agent.md`, `CONVERSATION_MEMORY.md`.
**Next:** Independently review TASK-001, then update the active Master Automation to load this prompt for completed-task handoffs.
**Notes:** The broader governance bootstrap remains incomplete; the Master Automation must stay in dry-run mode until its approved plan is implemented.

### [2026-05-19] Agent: Claude | Model: claude-sonnet-5
**Did:** Third autonomous `/loop` iteration (run manually this time at the user's request instead of waiting for the scheduled wakeup — see Notes). Built the web app shell: `TopNav`, `Sidebar`, `AppShell` under `apps/web/src/components/layout/`, plus `Wordmark`/`Avatar`/`Tag`/`Button` primitives under `apps/web/src/components/ui/`, wired together at a new `/app` route with placeholder content (no live data — that's later). Converted the `new-todo/project/planote-*.jsx` inline-style prototype into real Tailwind components against the tokens already in `tailwind.config.ts` (didn't need to touch that file — it already matched `05-ui-ux-design.md` exactly). Added `lucide-react` since the prototype's `Icon name="..."` values are literally Lucide icon names. Found the app had no theme mechanism at all — nothing set `.dark` anywhere, so despite dark mode being fully styled it was silently rendering light by default, contradicting "dark is primary/hero" in the design doc. Fixed by defaulting `<html>` to `className="dark"` in the root layout; a real toggle/persistence is still future work (logged as a Known Issue). Also fixed a real pre-existing CSS bug noticed while in `globals.css`: the universal `* { border-color }` reset was hardcoded to the dark palette's border color regardless of mode, which would break every light-mode border on any element using the bare `border` utility — changed to `var(--border)`. Verified with lint + type-check + build (all clean, monorepo-wide), and — since this is UI work — actually looked at it: built, served on port 34567 (3001/3002/3004 were occupied by unrelated processes on this machine), and used the agent-browser skill to screenshot both `/` and `/app` in a real headless browser to confirm the dark theme, gradient wordmark, sidebar, and nav all render correctly, not just that the build passed.
**Changed:** Added `apps/web/src/components/ui/{Wordmark,Avatar,Tag,Button}.tsx`, `apps/web/src/components/layout/{TopNav,Sidebar,AppShell}.tsx`, `apps/web/src/app/app/page.tsx`. Modified `apps/web/package.json` (added lucide-react), `apps/web/src/app/layout.tsx` (dark default), `apps/web/src/app/globals.css` (border-color fix).
**Next:** App shell is done. Next real frontend piece per the loop's priority order: pick one more small slice — Clerk auth pages (sign-in/sign-up UI, SDK wiring can stay stubbed without real keys) or start wiring the Kanban board to live Tasks/Dashboards API data (would need a data-fetching layer — TanStack Query per the tech stack — plus a Clerk client session to even get a token, so auth pages probably need to come first).
**Notes:** The autonomous timer-based wakeup (`ScheduleWakeup`) doesn't survive the user sending new chat messages in between — asking "what happened?" mid-loop appears to consume/interrupt the pending scheduled fire rather than letting it run in the background. Something to keep in mind: if the user goes quiet, the timer works; if they check in, the loop needs to be explicitly resumed. Nothing this iteration needed to stop for human input — no credentials or product decisions were involved, and the two ambiguous points (icon set, font delivery) mentioned as open questions in `05-ui-ux-design.md` were resolved pragmatically (Lucide, existing Google Fonts CSS import) rather than blocking on them, since they're low-stakes implementation details, not product decisions.

### [2026-05-19] Agent: Claude | Model: claude-sonnet-5
**Did:** Second autonomous `/loop` iteration. Fixed the `apps/web` build (logged as a known issue last iteration): `next.config.ts` isn't supported by the installed Next.js 14.2.35 — TS config files need Next 15+, and upgrading the major version wasn't in scope for this fix, so converted to `next.config.mjs` instead (same content, JSDoc typing). Also removed `experimental.reactCompiler` from that config — it's not a recognized key on 14.2.x and was only producing a build warning. While in there, found apps/web had the exact same gap as apps/api did last iteration: no ESLint config file wired to the shared `@planote/config/eslint/next` config, so `next lint` was hanging on an interactive setup prompt. Fixed with `apps/web/.eslintrc.cjs` using the same `require.resolve(...)` pattern as apps/api's config. Also noticed `next-env.d.ts` and `*.tsbuildinfo` (Next.js/TS generated files) weren't in `.gitignore` and had gotten created during this work — added the standard entries and deleted the generated files rather than committing them. End state: `pnpm lint`, `pnpm type-check`, and `pnpm build` are now all green across the *entire* monorepo (api + web together) for the first time since the project started. Verified with a live smoke test: built the web app, ran `next start`, curled it — real 200 response with the actual "Planote" landing page HTML (not a stub).
**Changed:** Removed `apps/web/next.config.ts`. Added `apps/web/next.config.mjs`, `apps/web/.eslintrc.cjs`. Modified `.gitignore` (added `*.tsbuildinfo`, `next-env.d.ts`).
**Next:** Backend (Auth, Dashboards, Tasks, Notes) and the build/lint/type-check pipeline for both apps are now solid. The actual next step per the loop's priority order is real frontend feature work: apps/web still only has the default landing page — no auth pages, dashboard, task modals, or notes UI exist yet. That's a big unit of work; next iteration should pick ONE small piece of it (e.g. just the Clerk auth pages, or just the app shell/nav) rather than trying the whole frontend at once.
**Notes:** Nothing required stopping for human input this iteration either — this was pure build-tooling/config work, no product decisions or credentials involved.

### [2026-05-19] Agent: Claude | Model: claude-sonnet-5
**Did:** Ran on an autonomous `/loop` for the first time (feature/autonomous-build branch, backed up prior uncommitted work in a separate commit first). Built Milestone 6 — Notes API (`apps/api/src/notes/`: controller, service, DTOs, module) covering CRUD, gap-based grid positioning, password protection via bcrypt (set/remove/unlock, with content+contentPreview scrubbed on locked notes for both list and findOne until unlocked), and task linking/unlinking (FK lives on `Task.linkedNoteId`, so Notes-side linking just validates ownership on both sides and updates the task). Added `bcryptjs` + `@types/bcryptjs` deps. Along the way found and fixed two real pre-existing bugs blocking verification: (1) `apps/api` had no ESLint config file at all despite a shared config existing in `packages/config/eslint/nest.js` — added `apps/api/.eslintrc.cjs` (had to use `require.resolve(...)` in `extends` because ESLint 8's shareable-config name-mangling breaks on scoped-package subpaths like `@planote/config/eslint/nest`); fixing this surfaced 3 unrelated pre-existing lint errors (unused imports/type in `current-user.decorator.ts`, `tasks.service.ts`, and a redundant string-literal union in `webhook.controller.ts`) which I also fixed. (2) `nest build` was silently writing output to `packages/config/typescript/dist` instead of `apps/api/dist`, because `outDir: "./dist"` in the shared base tsconfig resolves relative to *that* config file, not the extending one — added an explicit `outDir` override in `apps/api/tsconfig.json`. Verified everything with `pnpm --filter @planote/api lint/type-check/build`, then booted the real compiled server against the Dockerized Postgres and curled it: `/health` → 200, `/notes` (and other protected routes) → 401 without a token, confirming the guard + DB wiring is real, not just type-checking clean.
**Changed:** Added `apps/api/src/notes/**`, `apps/api/.eslintrc.cjs`. Modified `apps/api/package.json` (bcryptjs deps), `apps/api/tsconfig.json` (outDir fix), `apps/api/src/app.module.ts` (register NotesModule), `apps/api/src/auth/decorators/current-user.decorator.ts`, `apps/api/src/tasks/tasks.service.ts`, `apps/api/src/users/webhook.controller.ts` (pre-existing lint fixes), `pnpm-lock.yaml`.
**Next:** Backend feature-scope gaps look closed for now (Auth, Dashboards, Tasks, Notes all implemented). Next up per the loop's priority order: wire `apps/web` to the real backend using the existing design assets — but `apps/web` currently fails to build at all (see Known Issues: `next.config.ts` not supported), so that's the very first thing to fix before any frontend feature work.
**Notes:** Nothing hit that needed to stop for human input this iteration — no real credentials were needed for anything implemented. The Clerk-gated smoke test could only verify guard behavior (401), not actual authenticated CRUD, since only a placeholder `CLERK_SECRET_KEY` exists locally.

### [2026-05-18] Agent: Codex | Model: gpt-5
**Did:** Explained what DTOs mean in the NestJS dashboards API and how the current dashboard/column DTO classes validate request bodies.
**Changed:** CONVERSATION_MEMORY.md
**Next:** Milestone 5 remains Tasks API.
**Notes:** No product or architecture decisions changed.

### [2026-05-17] Agent: Claude | Model: claude-sonnet-4-6
**Did:** Completed Milestone 4 — Dashboards API. Full CRUD for dashboards and their columns. Gap-based positioning (0/10/20/…) for both. `PATCH /dashboards/reorder` and `PATCH /:id/columns/reorder` for drag-and-drop. Column deletion blocked with 422 when tasks exist (foreign key Restrict). Added `UsersService.requireByClerkId()` for clean clerkId→userId resolution across all service methods. Live-tested: dashboard routes return 401 without token; health returns 200 (public).
**Changed:** Added `apps/api/src/dashboards/` (dashboards.service.ts, dashboards.controller.ts, dashboards.module.ts, 5 DTOs), updated users.service.ts (+requireByClerkId), app.module.ts (+DashboardsModule).
**Next:** Milestone 5 — Tasks API (CRUD + move between columns + reminder create/update/delete).
**Notes:** Route order in NestJS controller matters — `"reorder"` literal route declared before `":id"` param route to avoid capture.

### [2026-05-17] Agent: Claude | Model: claude-sonnet-4-6
**Did:** Completed Milestone 3 — Clerk Authentication. Built NestJS auth layer using `@clerk/backend` standalone `verifyToken` (no `@clerk/nestjs` package exists). Global `ClerkAuthGuard` via `APP_GUARD`, `@Public()` decorator for health + webhook routes, `@CurrentUser()` param decorator, `UsersService` for DB sync, `WebhookController` at `POST /webhooks/clerk` with svix signature verification. Enabled `rawBody: true` in NestFactory for svix HMAC. Verified: health endpoint returns 200 without token, server starts cleanly with both modules registered.
**Changed:** Added `apps/api/src/auth/` (clerk.service.ts, auth.module.ts, guards/clerk-auth.guard.ts, decorators/public.decorator.ts, decorators/current-user.decorator.ts), `apps/api/src/users/` (users.service.ts, users.module.ts, webhook.controller.ts), updated app.module.ts, main.ts (rawBody), health.controller.ts (@Public).
**Next:** Milestone 4 — Dashboards API (CRUD endpoints for dashboards and columns using the new auth guard).
**Notes:** No `@clerk/nestjs` package exists — use `@clerk/backend`'s standalone `verifyToken(token, { secretKey })`. Webhook secret (`CLERK_WEBHOOK_SECRET`) must be configured in `.env` before webhook works in production.

### [2026-05-17] Agent: Claude | Model: claude-sonnet-4-6
**Did:** Completed Milestone 2 — Backend Foundation + Database Schema. Fixed three Prisma 7 breaking changes: (1) `defineConfig` requires `datasource: { url }` not `datasourceUrl`; (2) `PrismaClient` constructor requires a Driver Adapter (`@prisma/adapter-pg`) — no longer accepts plain connection strings; (3) shared `nestjs.json` tsconfig had absolute `rootDir` that broke cross-package extension. Also diagnosed a local PostgreSQL installation conflict on port 5432/5433 — Docker Postgres remapped to port 15432. API starts cleanly, database connected, all 7 tables created.
**Changed:** `apps/api/prisma.config.ts` (datasource.url fix + dotenv load), `apps/api/src/database/prisma.service.ts` (Driver Adapter pattern), `packages/config/typescript/nestjs.json` (remove rootDir), `apps/api/tsconfig.json` (add rootDir locally), `docker-compose.yml` (port 15432), `apps/api/.env` + `.env.example` (port 15432), `dev.sh` (port log message), `apps/api/package.json` (added @prisma/adapter-pg, pg, @types/pg).
**Next:** Milestone 3 — Clerk authentication: install @clerk/nestjs, add ClerkModule to AppModule, implement auth guard, protect routes, add webhook handler for user sync.
**Notes:** Local machine has 2 PostgreSQL instances on ports 5432 and 5433. Always use port 15432 for Planote's Docker Postgres on this machine. Migration file at `apps/api/prisma/migrations/20260517191107_init_schema/`.

### [2026-05-17] Agent: Codex | Model: gpt-5
**Did:** Expanded the implementation-tutor prompt into a more comprehensive master prompt covering teaching style, architecture, coding standards, verification, production readiness, and memory updates.
**Changed:** CONVERSATION_MEMORY.md
**Next:** Use the master prompt to guide Planote implementation sessions.
**Notes:** No product decisions changed.

### [2026-05-17] Agent: Codex | Model: gpt-5
**Did:** Rewrote the user's implementation-tutor prompt for Planote into a clearer senior-developer teaching prompt.
**Changed:** CONVERSATION_MEMORY.md
**Next:** Use the rewritten prompt when starting implementation planning/scaffolding.
**Notes:** No product decisions changed.

### [2026-05-17] Agent: Claude | Model: claude-sonnet-4-6
**Did:** Extracted Claude Design bundle. Locked all remaining decisions: Turborepo monorepo from day 1 (web-first build order), Homelab + Cloudflare Tunnel for local dev, GitHub Actions CI/CD for production, three environments (local/QA/prod), Neon database branching for QA data, anonymisation script from day one (nightly auto + manual trigger), Docker Compose for local dev, QA = staging with full prod data mirror.
**Changed:** CONVERSATION_MEMORY.md, new-todo/project/uploads/03-tech-stack.md
**Next:** Begin implementation — scaffold Turborepo monorepo. Sequence: Auth → Onboarding → Dashboard → Tasks → Notes → Mobile → Paywall → Admin.

### [2026-05-13] Agent: Claude | Model: claude-sonnet-4-6
**Did:** Full brainstorming session. Locked in Planote name, target users, differentiators, feature scope, several key decisions. Proposed tech stack — user wanted to discuss further.
**Changed:** CONVERSATION_MEMORY.md

### [2026-05-12] Agent: Codex | Model: GPT-5
**Did:** Read shared memory and summarized the recorded project discussion for the user.
**Changed:** CONVERSATION_MEMORY.md

### [2026-05-05] Agent: Claude | Model: claude-sonnet-4-6
**Did:** Created AGENTS.md and CONVERSATION_MEMORY.md for shared agent memory protocol.
**Changed:** AGENTS.md (new), CONVERSATION_MEMORY.md (new)
