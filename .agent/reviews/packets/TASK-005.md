# Reviewer Input Packet — TASK-005

- Task record: `.agent/tasks/TASK-005-role-prompts.md`
- Linked acceptance criteria: `AC-GOV-02`, `AC-GOV-03`
- Frozen diff: `.agent/reviews/packets/FROZEN-SNAPSHOT-V4.md`
- Implementer model/rationale: historical evidence unavailable; original generic implementation wording plus Terra/high and Terra/ultra routing history are preserved without fabrication.
- Fresh command evidence: V4 exit 0 — `pnpm agent:validate`; `pnpm agent:test` 29/29; `pnpm lint` (10 existing warnings); `pnpm type-check`; `pnpm test` (0 configured tasks); `pnpm build`; `git diff --check`.
- Authority boundary: independent read-only review only; no role prompt permits self-approval, commit, push, merge, deployment, credentials, billing, or acceptance changes.

Request a fresh independent `gpt-5.6-terra` / high task-level decision using the review template. Assess Terra/Luna routing, authority, reviewer independence, and validation coverage.
