# Shared Conversation Memory

> All AI agents must read this file at the start of every session and update it before ending.
> Protocol defined in: `AGENTS.md`
> Planning docs index: `new-todo/project/uploads/PLANNING_INDEX.md`

---

## Project Overview

**Name:** Planote
**Tagline concept:** Plan + Note — unified productivity
**Goal:** Premium cross-platform To-Do + Note-taking app. Kanban task management unified with rich-text notes. Cloud-native, freemium, agentic AI.
**Status:** Implementation in progress — Milestone 1 (Monorepo Foundation) underway.

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
| Implementation of Planote Design.html | Claude + User | Ready to start — all decisions locked |

---

## Completed Milestones

- [2026-05-15] Full design prototype built by Claude Design (8 sections, 40+ artboards)
- [2026-05-15] Tech stack fully decided (NestJS + Neon + Clerk + Razorpay + RevenueCat)
- [2026-05-15] Freemium model finalised (Option C)
- [2026-05-15] Design system tokens fully specified
- [2026-05-13] App name decided: Planote
- [2026-05-13] Feature scope, target users, differentiators defined
- [2026-05-05] Shared agent memory protocol established

---

## Known Issues / Blockers

- Visual companion server is localhost-only — must be restarted each session. Run:
  ```bash
  bash "C:/Users/onkar/.claude/skills/brainstorming/scripts/start-server.sh" --project-dir "c:/Data/Projects/New Todo"
  ```
  Then read URL from newest `.superpowers/brainstorm/<session>/state/server-info`

---

## Session Log

> Newest entries first.

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
