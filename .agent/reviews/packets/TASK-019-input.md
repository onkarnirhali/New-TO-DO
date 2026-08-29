# TASK-019 Review Packet

- Task: TASK-019 — Implement Planote Agent Operating System
- Acceptance criterion: AC-GOV-03
- Branch/worktree: `codex/agent-os-implementation` / `C:\Users\onkar\.agents\worktrees\New Todo\agent-os-impl`
- Implementers: gpt-5.6-luna / medium for routine governance documentation; no escalation.
- Reviewer: fresh gpt-5.6-terra / high; required for governance, routing, isolation, and delivery-control review.

## Scope

Reusable role prompts, contracts, policies, templates, dynamic routing authorities, rolling five-slot scheduler, metrics schema/baseline, shared README/memory, and approved design/plan documents. Product code and provider state are excluded.

## Acceptance mapping

- Repository-owned reviewer contract and review template remain present and exact-approved-only commit/push controls are preserved.
- Common role prompts require task packets, file scope, evidence, escalation, and stop conditions.
- Dynamic routing is consistent across the Master prompt, implementation/reviewer prompts, product memory, and promoted release-verification skill.
- Luna medium is limited to routine coding/verification; Terra high handles sensitive implementation/review/reconciliation; Terra ultra handles architecture/decomposition.

## Evidence

- `pnpm install --frozen-lockfile --ignore-scripts` — exit 0.
- `pnpm run agent:validate` — exit 0.
- `pnpm run agent:test` — 32 passed, 0 failed.
- `git diff --check` — exit 0.
- Documentation reference scan confirms the 45-minute next-run guard, handoff-ready state, review queue cap, and routing terms are present.
- No secrets, credentials, provider values, production data, or deployment actions were used.

## Review constraints

The task contributes to, but does not claim completion of, the broader AC-GOV-02 historical bootstrap criterion. Commit/push is forbidden unless the reviewer returns exactly `approved` with no P0/P1 findings.
