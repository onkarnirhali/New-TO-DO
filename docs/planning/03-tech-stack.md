# Planote — Tech Stack

> Last updated: 2026-05-15 | Status: Complete — all layers confirmed

---

## Full Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Web frontend** | Next.js 14+ (App Router) | Best React framework — SSR, SEO-friendly, Vercel-native |
| **Mobile** | React Native + Expo | Native feel on iOS/Android/iPad; shares JS logic with web |
| **Monorepo** | Turborepo | Shares types, API clients, utilities across web + mobile |
| **Styling — web** | Tailwind CSS | Utility-first, consistent design tokens |
| **Styling — mobile** | NativeWind | Tailwind syntax for React Native — same tokens across platforms |
| **State management** | Zustand + TanStack Query | Simple global state + server sync; works on both platforms |
| **Backend** | NestJS | Modular, TypeScript-first, scales cleanly as features grow |
| **ORM** | Prisma | Best TypeScript ORM; excellent migrations; pairs perfectly with NestJS |
| **Database** | PostgreSQL on Neon | Serverless managed PostgreSQL — no BaaS lock-in, just a database |
| **Cache + sessions** | Redis on Upstash | Serverless Redis — rate limiting, session storage, job queues |
| **Auth** | Clerk | Google OAuth + JWT + profile management + admin UI; 10,000 MAU free |
| **Realtime** | Socket.io (inside NestJS) | Live Kanban sync across devices |
| **File storage** | Cloudflare R2 | S3-compatible, zero egress fees — for note images and attachments |
| **Offline sync** | MMKV + sync queue | Fast local storage on mobile with background sync |
| **Rich text editor** | TipTap | Extension-based — clean feature gating for free/paid tiers |
| **Kanban DnD** | @dnd-kit | Best drag-and-drop library for React currently |
| **Push notifications** | Expo + FCM + APNs | Single API handling iOS + Android push |
| **Location** | Expo Location | Cross-platform GPS; integrates with Google/Apple Maps |
| **AI — Rephrase** | Claude API (Anthropic) | Best for text understanding and rewriting |
| **AI — Speech-to-text** | OpenAI Whisper | Industry standard, highly accurate |
| **AI — OCR** | Google Cloud Vision | Best OCR available, especially for mobile images |
| **Web deploy** | Vercel (Next.js) + Railway (NestJS) | Best-in-class for each |
| **Mobile deploy** | EAS (Expo Application Services) | OTA updates + App Store / Play Store builds |
| **Payments — mobile** | RevenueCat | Manages iOS + Android in-app purchases and entitlements |
| **Payments — web** | Razorpay | Indian payment gateway — UPI, cards, net banking, recurring billing |

---

## Key Architecture Decisions

### Why not Supabase
Supabase was considered and rejected. Reason: user preference for full control over backend and data. Replaced with:
- **Neon** — managed PostgreSQL only (not a BaaS)
- **NestJS** — full control over API and business logic
- **Clerk** — auth only, does not own data or business logic
- **Cloudflare R2** — file storage

### Why Clerk over alternatives
Clerk was chosen over Better Auth (open source) and custom Passport.js because:
- React Native SDK works across web + mobile (Auth.js does not)
- Built-in admin user management UI (Planote needs this for master admin)
- 10,000 MAU free — generous for launch phase
- Handles security edge cases (brute force, refresh token rotation, multi-device sessions)
- ~2 hours setup vs 1–3 days for alternatives

### Why RevenueCat + Razorpay (not a single payment solution)
RevenueCat is not a payment gateway — it's an in-app purchase management layer on top of Apple/Google billing. Apple and Google mandate their own billing for mobile in-app purchases. No Indian company can replace RevenueCat for mobile.

Razorpay handles web subscription payments — supports UPI, cards, net banking, recurring billing, and international payments.

### TipTap for feature gating
TipTap's extension-based architecture makes free/paid feature gating clean:
- Free extensions loaded for all users
- Paid extensions only loaded for paid users
- No complex interceptors needed — if the extension isn't loaded, the feature simply doesn't exist

### Offline sync approach
MMKV provides fast local storage on mobile. A sync queue handles background reconciliation with the PostgreSQL backend when connectivity is restored.

---

## Scalability Note

This stack is optimised for fast launch and developer experience. If Planote reaches significant scale:
- **Neon** can be migrated to self-hosted PostgreSQL (it's standard PostgreSQL underneath)
- **Clerk** can be replaced with custom auth (same migration path as any JWT system)
- **Railway** (NestJS hosting) can move to AWS ECS or similar

No decisions made here create hard walls at scale.
