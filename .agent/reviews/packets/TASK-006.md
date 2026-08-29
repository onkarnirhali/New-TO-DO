# Reviewer Input Packet — TASK-006

- Task record: `.agent/tasks/TASK-006-skill-lifecycle.md`
- Linked acceptance criteria: `AC-GOV-02`
- Frozen diff: `.agent/reviews/packets/FROZEN-SNAPSHOT-V4.md`
- Implementer model/rationale: historical evidence unavailable; original generic model wording and metadata-validation context are retained in Historical provenance.
- Fresh command evidence: V4 exit 0 — `pnpm agent:validate`; `pnpm agent:test` 29/29; `pnpm lint` (10 existing warnings); `pnpm type-check`; `pnpm test` (0 configured tasks); `pnpm build`; `git diff --check`.
- Authority boundary: independent read-only review only; protected skill promotion requires owner authority and no edits, verification, commit, push, merge, deployment, or credential action is permitted.

Request a fresh independent `gpt-5.6-terra` / high task-level decision using the review template. Assess skill lifecycle metadata, promotion controls, and repository validation.
