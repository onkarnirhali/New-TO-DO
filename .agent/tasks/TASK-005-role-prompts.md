# TASK-005 — Add governed agent role prompts

- Status: verified
- Acceptance criteria: AC-GOV-02, AC-GOV-03
- Owner: Master Delivery Agent
- Assigned agent: Codex
- Branch/worktree: `codex/governance-bootstrap`
- Model/effort: historical evidence unavailable
- Complexity rationale: historical evidence unavailable
- Escalation: historical evidence unavailable

## Historical provenance

The original record stated `current Codex implementation session / high` and
described safety-critical role authority and routing contracts. Its actions log
also records historical Terra/high review routing and Terra/ultra planning-route
updates, but no concrete implementation model/effort or escalation evidence was
preserved for this task record.

## Scope

Add and validate Master, implementation, Code Reviewer, and Security Reviewer
prompts with evidence, scope, routing, independence, and authority controls.

## Forbidden actions

- Do not weaken the existing approved reviewer contract.
- Do not change product acceptance criteria or external configuration.

## Assumptions

- The current automation's mandatory model-routing policy is part of the role
  contracts and is stricter than the earlier design text.
- Owner instruction dated 2026-08-26 supersedes the prior routing policy: only
  Terra and Luna may be selected; the retired planning model is prohibited.

## Prompt issued

Execute Implementation Plan Task 4 test-first and encode all current authority,
model routing, evidence, and reviewer-handoff requirements.

## Actions log

- Added and observed failing prompt-export and prompt-content tests.
- Implemented generic prompt control validation.
- Added and observed a failing missing-role-prompt repository test.
- Added the four role contracts and Terra/high review routing.
- Added a failing no-retired-model test, observed its failure, then routed all
  planning and architecture work to Terra/high and updated the active Codex
  automation to `gpt-5.6-terra`/high.
- Owner then refined the policy: added a failing route-completeness test and
  updated all executable role contracts to Terra/ultra for planning, Terra/high
  for implementation/review, and Luna/medium for non-approving routine
  verification; changed the active controller to Terra/ultra.

## Files changed

- `.agent/prompts/master-delivery-agent.md`
- `.agent/prompts/implementation-agent.md`
- `.agent/prompts/code-reviewer-agent.md`
- `.agent/prompts/security-reviewer-agent.md`
- `.agent/tasks/TASK-005-role-prompts.md`
- `scripts/validate-agent-governance.mjs`
- `scripts/validate-agent-governance.test.mjs`

## Evidence

- Tests: `pnpm agent:test` — 24 passed, 0 failed after the route-completeness
  policy update.
- Validator: `pnpm agent:validate` — passed.
- Type check: `pnpm type-check` — passed.
- Lint: `pnpm lint` — passed with 10 pre-existing web return-type warnings.
- Build: `pnpm build` — passed; root `pnpm test` ran zero package tasks.

## Review result

- Review report: `.agent/reviews/REVIEW-TASK-005-002.md`.
- Reviewer/model/effort: Fresh independent Code Reviewer Agent,
  `gpt-5.6-terra` / high (`/root/governance_rereview`), read-only.
- Decision: `approved`.
- Open findings: None; the report records no P0–P3 findings.

## Decisions and handoff

The exact approved review permits the focused governance commit/push gate; no
follow-up task is required. Historical implementation-route metadata remains
unavailable as recorded above.

## Git result

- Per-task SHA ownership is not recorded. TASK-005 is included in the
  consolidated governance commit `1704ed4acd6cc38183793ac7d9149dc57519baf9`.
- Branch: that consolidated commit is reachable from governed tip
  `4ee22c055b6258fa09d05d67e87ae192f6c4ca5e`, which tracks
  `origin/codex/governance-bootstrap`.
- Push: confirmed by the tracked remote branch state.
