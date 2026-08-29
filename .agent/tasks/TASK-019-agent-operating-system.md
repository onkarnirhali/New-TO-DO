# TASK-019 — Implement Planote Agent Operating System

- Status: active
- Acceptance criteria: AC-GOV-03
- Owner: Master Delivery Agent
- Assigned agent: parallel documentation agents / gpt-5.6-luna medium; final reviewer / gpt-5.6-terra high
- Branch/worktree: `codex/agent-os-implementation` / `C:\Users\onkar\.agents\worktrees\New Todo\agent-os-impl`
- Model/effort: routine implementation `gpt-5.6-luna / medium`; final review `gpt-5.6-terra / high`
- Complexity rationale: The implementation is reusable governance documentation, while the final review protects routing, isolation, and delivery-control invariants.
- Escalation: none.

## Scope

Add reusable Planote role prompts, task/handoff/review contracts, dynamic model-routing and rolling-scheduler policies, ticket/verification/review/metrics templates, and the first baseline metrics report. Update the Master prompt, Agent README, and shared memory to adopt the approved five-slot rolling pipeline. This task contributes to the broader AC-GOV-02 bootstrap but does not claim to complete its historical criterion-wide dry-run/root-gate evidence.

## Allowed files

- `.agent/prompts/common/**`
- `.agent/prompts/master-delivery-agent.md`
- `.agent/prompts/implementation-agent.md`
- `.agent/prompts/code-reviewer-agent.md`
- `.agent/contracts/**`
- `.agent/policies/**`
- `.agent/templates/**`
- `.agent/metrics/delivery-metrics.yaml`
- `.agent/README.md`
- `.agent/reports/progress/2026-08-29-agent-os.md`
- `.agent/tasks/TASK-019-agent-operating-system.md`
- `.agent/skills/promoted/task-delegation.md`
- `.agent/skills/promoted/release-verification.md`
- `.agent/reviews/packets/TASK-019-input.md`
- `.agent/reviews/packets/TASK-019-freeze.md`
- `.agent/memory/product.md`
- `CONVERSATION_MEMORY.md`
- `docs/superpowers/specs/2026-08-29-agent-operating-system-design.md`
- `docs/superpowers/plans/2026-08-29-agent-operating-system.md`

## Forbidden actions

Do not modify product source, credentials, provider configuration, deployment, protected branches, unrelated user changes, or acceptance criteria. Do not commit, push, merge, deploy, or self-approve before independent review.

## Evidence

- Task 1: prompts/routing created; `pnpm run agent:validate` and `pnpm run agent:test` passed (32/32); diff check passed.
- Task 2: contracts/policies/templates created; validation was rerun after dependency installation.
- Task 3: scheduler policy and README/Master integration created; validation passed (32/32); diff check passed.
- Task 4: metrics schema/baseline/memory created; validation passed (32/32); diff check passed.
- Final combined gates: pending after packet freeze.

## Review result

- Review report: pending fresh independent Terra/high review.
- Decision: pending.
- Open findings: none known; review required.

## Git result

- Commit: forbidden pending exact approval.
- Branch: `codex/agent-os-implementation`.
- Push: forbidden pending exact approval.
