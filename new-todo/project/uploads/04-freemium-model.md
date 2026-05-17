# Planote — Freemium Model

> Last updated: 2026-05-15 | Status: Complete — model and all downgrade policies decided

---

## Chosen Model: Option C — Core Free, Premium Features Paid

**Principle:** The free tier covers daily productivity needs. The paid tier unlocks what makes Planote unique — AI, location intelligence, and advanced note security.

---

## Feature Tiers

### Free Tier

| Category | Feature |
|----------|---------|
| **Auth** | Email registration, password reset, Google OAuth, profile photo |
| **Dashboard** | Unlimited dashboards, configurable Kanban columns, drag-and-drop |
| **Tasks** | Create/edit/delete, title + description + due date, cross-dashboard sharing, note linking, time-based reminders |
| **Notes** | Create/edit/delete, note-task linking, 4×4 grid view |
| **Rich text** | Bold, italic, underline, H1/H2/H3, code, bullet + numbered lists |
| **Images** | Basic image embed — full-width (paste or upload) |
| **Platforms** | Web, iOS, Android, iPadOS |
| **Sync** | Offline mobile support + background sync |

### Paid Tier

| Category | Feature |
|----------|---------|
| **AI** | Rephrase full note, rephrase selected text, speech-to-text (mobile), image-to-text OCR (mobile), future AI agents |
| **Reminders** | Location-based reminders (GPS proximity + configurable radius) |
| **Notes** | Password-protected notes (create + manage) |
| **Rich text** | Text wrap (float left/right), image resize, image captions |
| **Support** | Priority support |

---

## Why image embed is free

Basic image embed (full-width, paste/upload) is given free to match competitor baseline — Notion, Apple Notes, Bear, and Evernote all provide this for free. Gating it would cause friction and bad reviews without meaningful upgrade motivation. Advanced image handling (wrap, resize, captions) is what paid users actually pay for.

---

## Downgrade Policies

> **Core principle: Never delete user data on downgrade. Always pause, preserve, and restore.**

| Scenario | Policy |
|----------|--------|
| **Notes with embedded images** | Keep existing images visible and intact. Disable the ability to add new images. No stripping. |
| **Notes with text wrap applied** | Keep layout exactly as designed. Disable wrap controls. User can edit text freely but cannot change wrap settings or add new wrapped images. |
| **Password-protected notes** | Keep protection active — password still works. Lock the management settings (cannot change password or add protection to new notes). Warn user before they remove a password that they cannot re-add it without upgrading. |
| **Location-based reminders** | Pause immediately — do not fire, do not delete. Show "paused" badge on affected tasks. Resume automatically when user re-upgrades. |
| **Clipboard paste with images** | Paste text content only. Show a friendly non-blocking toast: *"Images in pasted content were removed. Upgrade to embed images."* |
| **Keyboard shortcut for paid feature** | Cancel the command. Show a brief toast with an upgrade link. Never silently fail. |
| **Failed payment / lapsed subscription** | Day 0: email + in-app notification, everything still works. Day 3: second email + app banner. Day 7: soft downgrade. Data preserved. Payment restored → immediate full access. |
| **Export with paid content** | Always export full content regardless of current tier. No stripping on export. |
| **Future collaboration — free user viewing paid content** | Free collaborators can view all content fully. Cannot create or modify paid-format elements. |

---

## Editor Feature Gating (TipTap)

Free vs paid features in the text editor are controlled at the extension level:

```typescript
const FREE_EXTENSIONS  = [Bold, Italic, Underline, Heading, Code, BulletList, Image]
const PAID_EXTENSIONS  = [...FREE_EXTENSIONS, TextWrap, ImageResize, ImageCaption]

const editor = useEditor({
  extensions: user.isPaid ? PAID_EXTENSIONS : FREE_EXTENSIONS
})
```

If an extension isn't loaded, its toolbar button, keyboard shortcut, and command simply do not exist for that user. No complex interceptors needed.

---

## Schema Notes

Add `contains_premium_content: boolean` to the notes table from day one. This supports:
- Efficient downgrade handling (know which notes need attention)
- Future collaboration feature (free collaborators can view but not edit premium elements)
