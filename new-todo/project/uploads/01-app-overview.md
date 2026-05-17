# Planote — App Overview

> Last updated: 2026-05-15 | Status: Complete

---

## Identity

| Field | Value |
|-------|-------|
| **App name** | Planote |
| **Tagline concept** | Plan + Note — unified productivity |
| **Type** | Premium cross-platform To-Do + Note-taking app |
| **Model** | Freemium |
| **Infrastructure** | Cloud-native |
| **AI** | Agentic AI capabilities |

---

## Target Platforms

| Platform | Status |
|----------|--------|
| Web App | Planned for launch |
| iOS | Planned for launch |
| Android | Planned for launch |
| iPadOS | Planned for launch |
| Chrome Extension | Deferred — only if adoption warrants it |

---

## Target Users

| Segment | Description | Analogy |
|---------|-------------|---------|
| **Power users** | Developers, designers, consultants managing complex work | Linear / Notion power users |
| **General consumers** | Anyone wanting a polished to-do + notes replacement | Todoist / Apple Notes users |
| **Students** | Note-heavy users needing organisation across subjects | Bear / Notion students |

**UX principle:** Layered interface — simple by default, powerful when needed. Serves all three without overwhelming any.

---

## Primary Differentiators

| # | Differentiator | Why it matters |
|---|----------------|----------------|
| 1 | **Kanban + Notes unified** | Most apps do one well. Planote does both in a single polished package — no switching apps |
| 2 | **Location-aware reminders** | GPS proximity-triggered task reminders. Rare in the market. Genuinely useful for errands, office arrivals, location-specific tasks |
| 3 | **Premium design & simplicity** | Cleaner than Notion, more powerful than Apple Notes. Design is a first-class feature |

---

## Collaboration Strategy

| Phase | Scope |
|-------|-------|
| **Launch** | Solo users only. All data is strictly user-specific — no cross-user access |
| **Future release** | Team collaboration, shared boards, shared notes |

**Schema note:** Design data models with collaboration in mind from day one even though it won't be built initially. Add `contains_premium_content` boolean to notes table.
