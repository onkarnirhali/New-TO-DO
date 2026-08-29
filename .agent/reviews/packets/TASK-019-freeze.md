# TASK-019 Freeze Manifest

- Task: TASK-019
- Branch: `codex/agent-os-implementation`
- Base: `f239483`
- Frozen at: `2026-08-29T12:20:00+01:00`
- Freeze state: documentation-only candidate; no commit or push yet.
- Aggregate hash (all listed files except this freeze file): `1f2d7ab2174b5d3c245817ad8f72e4eb32cd084e2a1bef3cfae6d7d5b2c29c7d`.

## Required gates

- `pnpm install --frozen-lockfile --ignore-scripts` — passed.
- `pnpm run agent:validate` — passed.
- `pnpm run agent:test` — 32/32 passed.
- `git diff --check` — passed.

## Sensitive-value statement

The candidate contains no credentials, tokens, endpoint values, bucket/object values, production data, or provider responses. It changes only governed prompts, contracts, policies, templates, metrics, memory, and planning documents.

## Changed-file manifest

The complete literal manifest is:

```text
.agent/README.md
.agent/contracts/handoff-contract.md
.agent/contracts/review-contract.md
.agent/contracts/task-contract.md
.agent/memory/product.md
.agent/metrics/delivery-metrics.yaml
.agent/policies/escalation.md
.agent/policies/file-ownership.md
.agent/policies/model-routing.md
.agent/policies/parallelism.md
.agent/policies/rolling-scheduler.md
.agent/prompts/code-reviewer-agent.md
.agent/prompts/implementation-agent.md
.agent/prompts/master-delivery-agent.md
.agent/prompts/common/implementation-agent.md
.agent/prompts/common/integration-agent.md
.agent/prompts/common/planner-agent.md
.agent/prompts/common/reviewer-agent.md
.agent/prompts/common/verification-agent.md
.agent/reports/progress/2026-08-29-agent-os.md
.agent/reviews/packets/TASK-019-input.md
.agent/reviews/packets/TASK-019-freeze.md
.agent/skills/promoted/release-verification.md
.agent/skills/promoted/task-delegation.md
.agent/tasks/TASK-019-agent-operating-system.md
.agent/templates/review-packet.md
.agent/templates/run-metrics.md
.agent/templates/task-ticket.md
.agent/templates/verification-report.md
CONVERSATION_MEMORY.md
docs/superpowers/plans/2026-08-29-agent-operating-system.md
```

Reproduction: from the worktree, sort the literal paths excluding this freeze file; compute each SHA-256; join lines as `<lowercase hash><two spaces><path>` separated by LF; SHA-256 the UTF-8 joined bytes. The reviewer must recompute this value, reject any file outside TASK-019 scope, and record the exact final hash in the review.
