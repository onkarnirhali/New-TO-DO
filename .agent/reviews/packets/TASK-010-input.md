# Review Input Packet — TASK-010

- Frozen at: 2026-08-26T22:43:19.8351557+01:00
- Base commit: `1704ed4acd6cc38183793ac7d9149dc57519baf9`
- Branch/worktree: `codex/governance-bootstrap` / `C:\Users\onkar\.agents\worktrees\New Todo\governance-bootstrap`
- Implementer routing: `gpt-5.6-terra` / high — bounded governance-contract implementation.
- Review routing: fresh independent `gpt-5.6-terra` / high — required by the repository-owned reviewer contract.

## Task and criteria

- Task record: `.agent/tasks/TASK-010-product-first-planning.md`
- Acceptance criteria: `AC-GOV-02`, `AC-GOV-03`
- Owner-approved intent: add product-first planning controls to the Master Agent prompt and ensure every Master plan follows them.

## Frozen changed files

- `.agent/delivery-ledger.yaml`
- `.agent/prompts/master-delivery-agent.md`
- `.agent/tasks/TASK-010-product-first-planning.md`
- `scripts/validate-agent-governance.mjs`
- `scripts/validate-agent-governance.test.mjs`

## Frozen implementation summary

- The Master prompt must prioritize actual code implementation and product development.
- Every plan must select the highest-priority ready acceptance criterion, target one user-visible outcome, use a small allowed file set, state dependencies, and include a verification stop condition.
- The prompt forbids whole-project replanning when the next ready criterion is known and defers mobile, billing, and AI until their approved milestones.
- `validatePrompt` requires all six controls for `master-delivery-agent.md`; a test proves a generic routed Master prompt is rejected.

## Verification evidence

- Red: `pnpm agent:test` — 29 passed, 1 failed with `Missing expected exception` for the new Master-prompt test.
- Green: `pnpm agent:test` — 30 passed, 0 failed.
- `pnpm agent:validate` — exit 0.
- `pnpm lint` — exit 0; 10 known web explicit-return-type warnings.
- `pnpm type-check` — exit 0.
- `pnpm test` — exit 0, no configured package test tasks.
- `pnpm build` — exit 0; same 10 known warnings.
- `git diff --check` — exit 0.

## Relevant repository memory and contracts

- `AGENTS.md` and `CONVERSATION_MEMORY.md` govern shared memory.
- `.agent/prompts/code-reviewer-agent.md` is the required independent review contract.
- `docs/planning/07-master-delivery-plan.md` defines the approved product milestone sequence.

## Reviewer request

Read the task record, this packet, the complete frozen diff against the stated base, and the required contracts. Review acceptance-criteria compliance, correctness, clarity, simplicity, validator scope, test quality, documentation, and governance/security impact. Return an evidence-backed P0–P3 report using `.agent/templates/code-review.md` and exactly one decision.
