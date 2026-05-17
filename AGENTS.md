# Agent Shared Memory Protocol

This file defines how all AI agents working in this project must read and update the shared conversation memory.

## Purpose

All AI agents (Claude, GPT, Gemini, or any other) working on this project use a single shared memory file to maintain context across sessions and across different AI systems. This eliminates manual context transfer between agents.

## File Structure

| File | Purpose |
|------|---------|
| `CONVERSATION_MEMORY.md` | Session log, current status, open questions, next steps |
| `docs/planning/PLANNING_INDEX.md` | Master index of all planning documents — read this to navigate decisions |
| `docs/planning/01-app-overview.md` | App name, users, platforms, differentiators |
| `docs/planning/02-feature-scope.md` | Full feature breakdown |
| `docs/planning/03-tech-stack.md` | Tech stack with rationale |
| `docs/planning/04-freemium-model.md` | Freemium model + downgrade policies |
| `docs/planning/05-ui-ux-design.md` | UI/UX design decisions and flows |
| `docs/planning/06-design-spec.md` | Full consolidated design spec |

## Rules for Every Agent

### On Session Start
1. Read `CONVERSATION_MEMORY.md` for current session status and open questions.
2. Read `docs/planning/PLANNING_INDEX.md` to understand what has been decided and where to find details.
3. Only open individual planning docs when you need detail on a specific topic — the index will direct you.
4. Treat the planning docs as the source of truth for all decisions. `CONVERSATION_MEMORY.md` is for session state only.

### During and After Each Session
1. Update `CONVERSATION_MEMORY.md` with any new decisions, progress, or context that future agents need.
2. Always prepend a session entry at the top of the `## Session Log` section (newest first).
3. Update the relevant sections (Project State, Decisions, Open Questions) in place — do not duplicate, just revise.
4. Keep entries concise. Avoid restating what is already written.

### Entry Format for Session Log

```
### [YYYY-MM-DD] Agent: <AgentName> | Model: <ModelID>
**Did:** <1-2 lines on what was accomplished>
**Changed:** <files or components modified, if any>
**Next:** <what needs to happen next, if known>
**Notes:** <any important context, blockers, or decisions>
```

Example:
```
### [2026-05-05] Agent: Claude | Model: claude-sonnet-4-6
**Did:** Created AGENTS.md and CONVERSATION_MEMORY.md for shared agent memory protocol.
**Changed:** AGENTS.md, CONVERSATION_MEMORY.md (created)
**Next:** Begin capturing actual project tasks and decisions.
**Notes:** Protocol established so Claude, GPT, and Gemini can share context without manual transfer.
```

## What to Track in CONVERSATION_MEMORY.md

- **Project goal** and current status
- **Architecture decisions** already made (don't re-debate settled choices)
- **Tech stack** in use
- **Open questions** that need resolution
- **In-progress tasks** and who/what is working on them
- **Completed milestones**
- **Known issues or blockers**

## What NOT to Write

- Duplicate information already in the file — update existing entries instead
- Full code — reference file paths and line numbers instead
- Speculative notes not yet confirmed

## Agent Identity Reference

When writing your model ID, use the actual model identifier, not a marketing name:
- Claude Sonnet 4.6 → `claude-sonnet-4-6`
- Claude Opus 4.6 → `claude-opus-4-6`
- GPT-4o → `gpt-4o`
- Gemini 1.5 Pro → `gemini-1.5-pro`
- etc.
