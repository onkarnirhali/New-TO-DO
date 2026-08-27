# TASK-013 Immutable Contract Freeze — V2

- Frozen at: 2026-08-27T11:43:05.5592671+01:00
- Governed baseline: `6fd97162af6f1ed0c3b527718ba563f64b805af5`
- Branch/worktree: `codex/task-013-sprint-delivery-reporting` / `C:\Users\onkar\.agents\worktrees\New Todo\sprint-delivery-reporting`
- Scope: Only the six immutable implementation files are hashed. Ledger, plan, task, packet, run, progress, and review records are evidence documents that must remain writable through review and therefore are inspected separately, not included in this content hash.
- Aggregate SHA-256: `64041b93c87039b430ad63948fb691b14ba345140e890c0987f2e24e67ad38f8`

## File hashes

```text
.agent/automations/master-delivery-controller.json 1c867eae02100e2ea7a41cc10c1c3efabe2713f2ea4f31a6f313f2e27f049796
.agent/automations/master-delivery-controller.md b3806cba9770700456c135ff6a678a1ac7e5928544725a262992863d5ba67124
.agent/prompts/master-delivery-agent.md 20999ef54a652513648406b13d9d7983098a2779f4bfc4f889c67b9b4eff2eb7
.agent/templates/progress-report.md 42e9972656539d9ac0832545e71c60d2358af36eb6486249a3128b4942d0b063
scripts/validate-agent-governance.mjs 6392785e78dbc6e181d5dd04f85c9e1657a82c3724e657ec61d67e724096a530
scripts/validate-agent-governance.test.mjs 893d8c36d15c328a039edbb559ee0c253890687b02d3adfb8518f974c40a415d
```

## Root-cause correction

`REVIEW-TASK-013-001.md` correctly blocked V1: its task-record hash was calculated before the required implementation-evidence action-log entry was appended. V2 removes mutable evidence records from the immutable contract snapshot instead of re-freezing them after every record update. The reviewer must inspect every excluded delivery record and current changed-file list separately.

## Reproduction

Hash each listed file with SHA-256 in listed order, join `<path><TAB><lowercase hash><LF>` as UTF-8, then SHA-256 the byte sequence. The aggregate must match. A mismatch blocks review and does not permit implementation edits.
