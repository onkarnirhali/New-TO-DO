# Planote — Planning Index

> **For agents:** Read this file first. It tells you exactly which document to open for any topic.
> Then read `CONVERSATION_MEMORY.md` for current session status and open questions.

---

## How to use this index

1. Find the topic you need in the table below
2. Open the linked file — it contains the full, up-to-date decision on that topic
3. If a file is marked `[IN PROGRESS]` or `[NOT STARTED]`, check `CONVERSATION_MEMORY.md` for partial context

---

## Document Index

| # | File | What it covers | Status |
|---|------|---------------|--------|
| 01 | [App Overview](01-app-overview.md) | App name, goal, target users, platforms, primary differentiators | ✅ Complete |
| 02 | [Feature Scope](02-feature-scope.md) | Full feature breakdown — Auth, Dashboard, Tasks, Notes | ✅ Complete |
| 03 | [Tech Stack](03-tech-stack.md) | Every technology chosen, with rationale and trade-offs | ✅ Complete |
| 04 | [Freemium Model](04-freemium-model.md) | Free vs paid features, downgrade policies, core principles | ✅ Complete |
| 05 | [UI & UX Design](05-ui-ux-design.md) | Visual style, design personality, UX flows per section | 🔄 In Progress |
| 06 | [Design Spec](06-design-spec.md) | Full consolidated spec — architecture, components, data flow | ⏳ Not Started |

---

## Quick Decision Reference

| Decision | Answer | File |
|----------|--------|------|
| App name | **Planote** | [01](01-app-overview.md) |
| Target users | Power users, general consumers, students | [01](01-app-overview.md) |
| Platforms | Web, iOS, Android, iPadOS (Chrome extension deferred) | [01](01-app-overview.md) |
| Differentiators | Kanban+Notes unified, location reminders, premium design | [01](01-app-overview.md) |
| Freemium model | Option C — core free, premium features paid | [04](04-freemium-model.md) |
| Frontend web | Next.js 14+ | [03](03-tech-stack.md) |
| Frontend mobile | React Native + Expo | [03](03-tech-stack.md) |
| Backend | NestJS | [03](03-tech-stack.md) |
| Database | PostgreSQL on Neon | [03](03-tech-stack.md) |
| Auth | Clerk | [03](03-tech-stack.md) |
| Payments mobile | RevenueCat | [03](03-tech-stack.md) |
| Payments web | Razorpay | [03](03-tech-stack.md) |
| Offline support | Yes | [03](03-tech-stack.md) |
| Collaboration | Solo at launch, team in future releases | [01](01-app-overview.md) |
| UI modes | Light + dark mode | [05](05-ui-ux-design.md) |
| Due date field label | "Due Date" | [02](02-feature-scope.md) |
| Downgrade policy | Never delete data — pause, preserve, restore | [04](04-freemium-model.md) |

---

## Open Questions

> Things not yet decided. Check `CONVERSATION_MEMORY.md` for latest status.

- [ ] UI design personality — visual feel, colour palette, design density
- [ ] Dashboard UX — detailed flows
- [ ] Task creation flow — detailed UX
- [ ] Notes UX — detailed flows
- [ ] AI provider pricing / usage limits

---

## Session History

See `CONVERSATION_MEMORY.md` → Session Log for full history of what each agent did.
