# Planote — Feature Scope

> Last updated: 2026-05-15 | Status: Complete

---

## Auth & User Management

| Feature | Detail |
|---------|--------|
| Email registration | Standard email + password |
| Password reset | Via email link |
| Google OAuth | Login and registration via Google |
| Profile photo | User can upload, or pulled automatically from Google account |
| Master admin account | Special account with elevated privileges (see Admin section) |

### Admin Capabilities (Master User)

| Capability | Detail |
|-----------|--------|
| View all users | List of active and inactive accounts |
| Activate accounts | Enable a user account |
| Deactivate accounts | Disable a user account without deleting |
| Platform health | Overview of system status |

---

## Navigation

### Left Navigation Bar
- Context-sensitive — changes based on current view
- In **Dashboard mode:** Shows list of all user dashboards
- In **Notes mode:** Shows all notes in a structured tree/hierarchy

### Top Horizontal Navigation Bar
| Element | Detail |
|---------|--------|
| Profile avatar | Shows photo or initials avatar; clickable |
| Profile dropdown | Options: Logout, Settings, account management |
| Centre toggle | Two buttons to switch between Dashboard ↔ Notes views |

---

## Dashboard (Kanban)

| Feature | Detail |
|---------|--------|
| Multiple dashboards | User can create as many dashboards as needed |
| Custom labels | Each dashboard has its own name/label |
| Configurable columns | Each dashboard has its own set of Kanban columns (e.g. Board A: Todo/In-Progress/Done; Board B: Planned/Todo/In-Progress/Done) |
| Drag and drop | Tasks can be dragged across columns |

---

## Tasks

### Core Fields
| Field | Required | Detail |
|-------|----------|--------|
| Title | ✅ Yes | Short task name |
| Description | ❌ No | Optional longer detail |
| Due Date | ❌ No | "Due Date" — agreed label |

### Task Behaviour
| Feature | Detail |
|---------|--------|
| Always from dashboard | Tasks are always created within a dashboard context |
| Dashboard scope | Task can be scoped to one dashboard or shared across multiple — configurable at creation and editable later |
| Note linking | Task can be linked and unlinked from a note (checkbox + search/filter dropdown) |
| Create note from task | Button in task opens rich text editor in a large modal — note is accessible from Notes view too |

### Reminders
| Type | Platform | Detail |
|------|----------|--------|
| Time-based | All platforms | Standard date/time reminder |
| Location-based | Mobile | GPS proximity trigger — user sets coordinates + radius |
| Location maps | Android | Google Maps for coordinate selection |
| Location maps | iOS / iPad | Apple Maps for coordinate selection |
| Push delivery | Mobile only | Configured on web, delivered on mobile |

### Mobile-only Input Features
| Feature | Detail |
|---------|--------|
| Speech-to-text | Microphone input to create/dictate task content |
| Image-to-text (OCR) | Camera/photo input — AI extracts text from image |

---

## Notes

### Core Behaviour
| Feature | Detail |
|---------|--------|
| Independent or linked | Notes can exist standalone or linked to a task |
| Link to task | Can be linked/unlinked at creation or while editing |
| Password protection | Note can be locked with a password; password is updatable |
| Grid view | Notes screen shows 4×4 grid layout |
| Grid preview | Each note shows title + content ellipsis |
| Locked note display | Password-protected notes show lock icon instead of content preview |

### Rich Text Editor
| Feature | Tier |
|---------|------|
| Bold, italic, underline | Free |
| Headings H1, H2, H3 | Free |
| Code format | Free |
| Bullet and numbered lists | Free |
| Image embed — basic full-width | Free |
| Text wrap (float left/right) | Paid |
| Image resize | Paid |
| Image captions | Paid |

### AI Features in Notes
| Feature | Detail | Tier |
|---------|--------|------|
| AI Rephrase — full note | Rewrites entire note content | Paid |
| AI Rephrase — selected text | Rewrites only highlighted text | Paid |
