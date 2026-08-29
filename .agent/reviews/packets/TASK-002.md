# Reviewer Input Packet — TASK-002

- Task record: `.agent/tasks/TASK-002-governance-invariants.md`
- Linked acceptance criteria: `AC-GOV-01`
- Frozen diff: `.agent/reviews/packets/FROZEN-SNAPSHOT-V4.md`
- Implementer model/rationale: historical `gpt-5.6-luna` / medium retained with policy-provenance note; bounded policy and validator work. Escalation: none.
- Fresh command evidence: V4 exit 0 — `pnpm agent:validate`; `pnpm agent:test` 29/29; `pnpm lint` (10 existing warnings); `pnpm type-check`; `pnpm test` (0 configured tasks); `pnpm build`; `git diff --check`.
- Authority boundary: independent read-only review only; no waivers, edits, self-approval, commit, push, merge, deployment, credentials, or acceptance changes.

Request a fresh independent `gpt-5.6-terra` / high task-level decision using the review template. Assess governance invariant enforcement and the directory-path regression without normalizing historical routing.
