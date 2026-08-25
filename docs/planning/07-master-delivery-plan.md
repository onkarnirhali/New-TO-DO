# Planote — Master Delivery Plan and Acceptance Criteria

> **Purpose:** This is the single delivery checklist for the agreed Planote product. It consolidates the feature scope, freemium rules, and design decisions into measurable acceptance criteria.
>
> **Current baseline (verified 2026-08-25):** The current branch has the monorepo, Nest API foundations, API Notes/Tasks/Dashboard work, and a web shell plus unconnected authentication screens. Google sign-in is not implemented: the button has no click handler and Clerk is not integrated into the Next app.

## Product goal

Planote is a dark-first, premium productivity product that combines Kanban task planning and rich notes. It launches as a private, user-specific web app, then expands to iOS, iPadOS, and Android. The free tier covers everyday planning; paid unlocks advanced note security, AI, and location intelligence.

## Delivery rules

- Data is private to its owner; every protected API operation must enforce ownership.
- A downgrade never deletes user data. Paid content is preserved and restored on re-upgrade.
- Password-protected notes are an application privacy lock, not end-to-end encryption of database backups or object storage.
- Tests, type-checking, linting, and production builds must pass before a milestone is accepted.
- Real-provider smoke tests require real Clerk, database, and R2 credentials; placeholders do not count as end-to-end verification.

## Feature checklist and acceptance criteria

### 1. Authentication and account management — Web launch blocker

| Feature | Tier | Acceptance criteria |
|---|---|---|
| Email sign-up | Free | A visitor can create an account with name, email, and password; email verification errors are shown accessibly; an authenticated session is created; the app redirects to `/app`. |
| Email sign-in | Free | A valid email/password creates a Clerk session and opens `/app`; invalid credentials display a clear error without exposing account details. |
| Google sign-in / sign-up | Free | The Google button calls Clerk OAuth using `oauth_google`; `/sso-callback` completes the redirect; a new or returning user reaches `/app`; cancel/error states return to the auth page safely. |
| Password reset | Free | A user can request and complete Clerk's email-code password reset; success permits sign-in with the new password; errors are visible and no secret is logged. |
| Route protection | Free | Unauthenticated access to `/app/**` redirects or is denied; public auth/callback routes remain reachable; API requests carry a fresh Clerk bearer token. |
| Account profile | Free | Top navigation shows Clerk identity/avatar or initials; sign-out ends the session; profile data comes from trusted Clerk data. |
| User bootstrap | Free | First protected request safely creates/synchronises the local user and exactly one starter board with To Do, In Progress, and Done columns. Inactive users remain blocked. |

### 2. App shell and navigation — Web launch blocker

| Feature | Tier | Acceptance criteria |
|---|---|---|
| Responsive app shell | Free | Authenticated pages render a keyboard-accessible sidebar, top navigation, skip link, and main-content target at desktop and narrow widths. |
| Dashboard/Notes navigation | Free | Users can move between `/app`, dashboards, and Notes without losing access or showing broken handoff pages. |
| Theme support | Free | Dark mode is the default experience; light mode uses the approved contrast-safe palette; a user can change and retain their preference. |
| Accessibility baseline | Free | Keyboard focus is visible, controls have names, dialogs trap/restore focus, colour is not the only status signal, and key flows pass automated accessibility checks. |

### 3. Dashboards and Kanban — Web launch blocker

| Feature | Tier | Acceptance criteria |
|---|---|---|
| Dashboard CRUD | Free | Users can create, rename, and remove only their dashboards. A new dashboard starts atomically with To Do, In Progress, and Done columns. |
| Column management | Free | Users can add, rename, order, and remove columns; removal is refused when it would hide placed tasks. |
| Board view | Free | A dashboard loads its columns and only the caller's placed tasks; loading, empty, and retry states are understandable. |
| Drag and drop | Free | Pointer and keyboard moves update the selected task placement, preserve task order, support empty columns, and roll back/error safely on failure. |
| Shared tasks | Free | A task can appear on multiple dashboards with independent column/order placement; moving it on one board does not move it on another. The last placement cannot be removed. |

### 4. Tasks and reminders — Web launch blocker

| Feature | Tier | Acceptance criteria |
|---|---|---|
| Task CRUD | Free | Users can create, edit, complete, and delete owned tasks with required title, optional description, and Due Date. Validation matches API limits. |
| Task sharing | Free | Users can add/remove a dashboard placement through an understandable dialog; foreign dashboards and duplicate placements are rejected. |
| Note linking | Free | A task can link/unlink an owned note or create-and-link a note atomically; protected notes require their current password for relation changes. |
| Time reminders | Free | A user can create, update, and remove a valid time reminder; UI clearly states that web configures reminders and mobile delivery is a later platform feature. |
| Location reminders | Paid, mobile | Web does not pretend to deliver location alerts. Mobile implementation must collect coordinates/radius, gate by paid entitlement, and pause rather than delete on downgrade. |

### 5. Notes and rich-text editing — Web launch blocker

| Feature | Tier | Acceptance criteria |
|---|---|---|
| Notes grid | Free | `/app/notes` lists only owned notes in a responsive grid; each unlocked card shows title and server-derived preview; locked cards show title and lock only. |
| Note CRUD | Free | Users can create, rename, edit, and delete notes; task-linked notes remain reachable from both task and Notes views. |
| Rich text | Free | Editor supports bold, italic, underline, H1–H3, code block, bullet lists, numbered lists, and basic full-width images. Unsupported document JSON is rejected server-side. |
| Autosave and conflicts | Free | Saves debounce for 500 ms, allow one request at a time, send the note revision, and preserve the local draft on 401/403/409. A stale edit never silently overwrites another tab. |
| Note passwords | Paid | Paid users can add/change a password. Every protected mutation requires the current password. Locked API/card responses reveal neither content nor linked-task titles. |
| Downgrade behaviour | Paid data preserved | Existing locked notes stay locked and can be unlocked/edited/removed with the proof; a downgraded user cannot create a new lock or change its password. |
| Basic images | Free | An image upload is size/type/dimension validated; browser code never receives R2 credentials, direct R2 URLs, or object keys. Normal persisted-image removal is done by a successful note PATCH, not a premature client DELETE. |
| Private protected images | Paid lock behaviour | A protected image is fetched through an authenticated same-origin proxy with a short-lived per-request proof; the editor creates a revocable `blob:` URL; generic image URLs cannot bypass the note lock. |
| Advanced image formatting | Paid | Text wrapping, resizing, and captions are gated by entitlement; downgrade keeps existing formatting visible but disables new changes. |
| AI rephrase | Paid, later integration | Full-note and selected-text rephrase are entitlement-gated, show pending/error states, preserve original text until explicit accept, and record no secret prompts in logs. |

### 6. Admin and operations — Before public launch

| Feature | Tier | Acceptance criteria |
|---|---|---|
| Admin user management | Admin | A master admin can list users, see active/inactive state, and deactivate/reactivate users without deleting data. Non-admins cannot reach these endpoints or UI. |
| Platform health | Admin | Health view reports API/database/storage readiness without exposing secrets. |
| Clerk webhook handling | Operations | Verified Clerk webhook signatures drive user sync/deactivation safely; webhook and first-login races do not duplicate starter data. |
| Private R2 release check | Operations | Bucket/IAM are non-public; anonymous object reads fail; browser bundle contains no R2/presigned URL or credential; upload/read/delete failure recovery is tested. |
| Monitoring and recovery | Operations | Structured errors cover authentication, storage, and cleanup failures; durable attachment cleanup retries with backoff after a process or R2 failure. |

### 7. Mobile apps — Separate milestone after web core

| Feature | Tier | Acceptance criteria |
|---|---|---|
| iOS, iPadOS, Android | Free base | React Native/Expo clients authenticate through Clerk, sync the same private tasks/notes, and provide responsive phone/tablet layouts. |
| Offline sync | Free | Users can create/edit offline; a durable queue retries safely; conflicting records follow a documented user-visible rule. |
| Push reminders | Free time / Paid location | Time reminders and paid location reminders are delivered through native push permissions with clear opt-in and failure states. |
| Speech/OCR | Paid | Speech-to-text and image-to-text are explicit paid actions, show consent/loading/error states, and never run silently. |

### 8. Billing, settings, and later extensions — Separate milestones

| Feature | Acceptance criteria |
|---|---|
| Web billing (Razorpay) | Entitlements derive from verified server-side payment events; successful, failed, cancelled, and downgrade states follow the preservation policy. |
| Mobile billing (RevenueCat) | Native purchase/restore synchronises the same trusted entitlement without trusting a client-supplied tier. |
| Settings | User can manage theme, account, notification preferences, and subscription state without exposing provider secrets. |
| Collaboration | Deferred until solo workflows, ownership boundaries, and paid-content permissions have a separate approved specification. |
| Chrome extension | Deferred until usage warrants it. |

## Milestone sequence

1. **Web foundation:** install/wire Clerk, protect routes, finish API client and app shell.
2. **Web productivity core:** dashboards, columns, tasks, sharing, DnD, time reminders, and note linking.
3. **Web Notes:** grid, editor, revision-safe autosave, password rules, and private R2 attachments.
4. **Launch hardening:** admin, provider credentials, real browser smoke tests, security review, monitoring, and deployment.
5. **Mobile:** authenticated native client, offline sync, notifications, and paid mobile features.
6. **Billing/AI:** trusted entitlement system, Razorpay/RevenueCat, then paid AI features.

## Global release acceptance criteria

A release is acceptable only when all of the following are true:

- [ ] All launch-blocker rows above are implemented and demonstrated in a real authenticated browser session.
- [ ] Unit, integration, type-check, lint, and production build gates pass on the release commit.
- [ ] Real Clerk Google OAuth works from login and sign-up through the callback to `/app`.
- [ ] Real Neon/PostgreSQL migrations apply cleanly to a fresh database and upgrade representative existing data.
- [ ] Private R2 bucket/IAM and attachment lifecycle checks pass using real credentials.
- [ ] Authorization checks prove one user cannot read or mutate another user's dashboard, task, note, attachment, or profile data.
- [ ] Keyboard and screen-reader critical flows are reviewed: auth, navigation, Kanban movement, note unlock, editor save, image upload, and destructive confirmations.
- [ ] Downgrade policies preserve all existing data and visibly explain unavailable paid controls.
