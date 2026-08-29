# Documentation Policy

Every agent interaction must create or update an auditable repository record.

## Required record for each task

- Task ID and linked acceptance criteria.
- Assigned agent, selected model, reasoning effort, and complexity rationale.
- Scope, allowed files, forbidden actions, and assumptions.
- Prompt issued, action log, changed files, and verification evidence.
- Decisions, blockers, review outcome, Git commit, branch, and push result.

## Record locations

- Tasks: `.agent/tasks/`
- Plans: `.agent/plans/`
- Reviews: `.agent/reviews/`
- Architecture decisions: `.agent/decisions/`
- Progress and automation reports: `.agent/reports/`
- Service-specific memory: `.agent/memory/services/`

Use `CONVERSATION_MEMORY.md` as the concise cross-agent session index. Never
record secret values in any documentation.
