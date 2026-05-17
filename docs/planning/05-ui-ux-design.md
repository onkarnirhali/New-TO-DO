# Planote — UI & UX Design

> Last updated: 2026-05-15 | Status: In Progress (design direction confirmed, UX flows pending)

---

## Confirmed Decisions

| Decision | Value |
|----------|-------|
| UI modes | Light mode + Dark mode (both fully supported) |
| Design direction | **Bold & Modern** (Direction 3) |
| Primary inspiration | Linear, Raycast, Vercel — developer-grade dark-first design |
| UI modes strategy | Dark is primary/hero; light is equally polished |
| Design density | Medium — comfortable for consumers, information-rich for power users |
| Typography feel | Geometric sans (Inter) — clean, modern, neutral |
| Colour philosophy | Cool purple tint unifies both light and dark surfaces |
| Accent usage | Sparingly — gradient reserved for primary CTAs and key highlights |

---

## Design System Tokens

### Dark Mode Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#0C0C11` | Main canvas / page background |
| `--bg-surface` | `#12121A` | Cards, panels |
| `--bg-elevated` | `#1A1A26` | Hover states, selected cards |
| `--bg-overlay` | `#22223A` | Modals, dropdowns |
| `--border` | `#2A2A40` | Dividers, card borders |
| `--text-primary` | `#F0F0FF` | Headings, primary content |
| `--text-secondary` | `#A0A0C0` | Labels, metadata |
| `--text-muted` | `#6B6B90` | Placeholders, disabled text (min 4.5:1 on `--bg-base`) |
| `--accent-start` | `#7C3AED` | Gradient start (violet) |
| `--accent-end` | `#4F46E5` | Gradient end (indigo) |
| `--accent-flat` | `#6D28D9` | Single-colour accent for icons, tags |

### Light Mode Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#F4F4F8` | Main canvas (cool off-white, not pure white) |
| `--bg-surface` | `#FFFFFF` | Cards |
| `--bg-elevated` | `#F0F0F7` | Sidebar, secondary panels |
| `--bg-overlay` | `#E8E8F0` | Hover states |
| `--border` | `#E2E2EC` | Dividers |
| `--text-primary` | `#0C0C1E` | Headings |
| `--text-secondary` | `#4A4A6A` | Labels (decorative only — 3.1:1 ratio) |
| `--text-readable` | `#3A3A5A` | Body text (min 4.5:1 on white) |
| `--accent-start` | `#7C3AED` | Same gradient |
| `--accent-end` | `#4F46E5` | Same gradient |

### Typography Scale

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | Inter | 700 | 28px |
| Heading | Inter | 600 | 20px |
| Subheading | Inter | 500 | 16px |
| Body | Inter | 400 | 14px |
| Label | Inter | 500 | 12px |
| Caption | Inter | 400 | 11px |

### Spacing & Shape

| Token | Value |
|-------|-------|
| Base unit | 4px |
| Component radius | 8px (cards), 6px (tags/badges), 12px (modals) |
| Card padding | 16px |
| Column gap | 12px |
| Sidebar width | 240px |

### Animation

| Property | Value |
|----------|-------|
| Micro-interaction | 150ms ease-out |
| State transition | 200ms ease-out |
| Page transition | 250ms ease-in-out |
| Spring damping | 0.7 (card drag) |

---

## Accessibility Notes

| Check | Status | Detail |
|-------|--------|--------|
| Primary text contrast (dark) | Pass | `#F0F0FF` on `#0C0C11` → 15.2:1 |
| Secondary text (dark) | Pass | `#A0A0C0` on `#0C0C11` → 7.1:1 |
| Muted text (dark) | Pass | `#6B6B90` on `#0C0C11` → 4.6:1 (upgraded from #4A4A6A at 3.1:1) |
| Accent on dark | Pass | White text on gradient → above 4.5:1 |
| Primary text contrast (light) | Pass | `#0C0C1E` on `#FFFFFF` → 19.1:1 |
| Body text (light) | Pass | `#3A3A5A` on `#FFFFFF` → 7.4:1 |
| Label text (light) | Decorative only | `#4A4A6A` on `#FFFFFF` → 3.1:1 — must not carry meaning |

---

## Surface Hierarchy

4 levels on each mode — creates depth without heavy shadows:

| Level | Dark Token | Light Token | Usage |
|-------|-----------|-------------|-------|
| Base | `#0C0C11` | `#F4F4F8` | Page canvas |
| Surface | `#12121A` | `#FFFFFF` | Cards, main content |
| Elevated | `#1A1A26` | `#F0F0F7` | Hover, selected, sidebar |
| Overlay | `#22223A` | `#E8E8F0` | Modals, popovers |

---

## Open Questions

- [ ] Dashboard UX — Kanban board layout, column management, task cards
- [ ] Task creation flow — modal design, field layout, reminder setup
- [ ] Notes UX — grid view, editor layout, password protection flow
- [ ] Navigation UX — left nav behaviour, top nav interactions
- [ ] Onboarding flow — first-run experience for new users
- [ ] Upgrade / paywall flow — how users encounter and complete upgrade
- [ ] Icon set — Lucide vs Heroicons vs Phosphor
- [ ] Font delivery — Google Fonts vs self-hosted Inter

---

## Design Previews Created

| File | Description | Status |
|------|-------------|--------|
| `docs/design-previews/01-clean-minimal.html` | Linear/Craft style — monochrome, flat | Compared |
| `docs/design-previews/02-warm-approachable.html` | Things 3/Bear style — warm cream, orange | Compared |
| `docs/design-previews/03-bold-modern.html` | Bold dark — violet gradient, deep dark | **Selected** |
| `docs/design-previews/04-bold-modern-refined.html` | Full ui-ux-pro-max refinement with design tokens | Under review |
