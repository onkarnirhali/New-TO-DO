# TASK-001 — Create Code Reviewer Agent definition

- Status: verified
- Acceptance criteria: AC-GOV-03
- Owner: Master Delivery Agent
- Assigned agent: Codex
- Branch/worktree: `codex/code-reviewer-agent`
- Model/effort: historical evidence unavailable
- Complexity rationale: historical evidence unavailable
- Escalation: historical evidence unavailable

## Historical provenance

- The original task record linked `AC-GOV-REVIEW-01`; the current delivery
  ledger authoritatively maps TASK-001 to `AC-GOV-03`.
- The original record did not preserve an implementer model/effort, complexity
  rationale, or escalation record. Those fields must remain unavailable rather
  than being reconstructed after the fact.

## Scope

Create the repository-owned, independent, read-only Code Reviewer Agent prompt,
its review-record template, and a concise bootstrap index.

### AC-GOV-REVIEW-01 — Independent reviewer contract

The repository contains an authoritative Code Reviewer Agent prompt and review
template. They require independent read-only review, evidence-backed assessment
of acceptance criteria, functional correctness, quality, simplicity/reuse,
SOLID/architecture, performance, security, tests, and documentation; use
P0–P3 priorities; report a decision and action to the Master Agent; and allow
commit/push only for an exact `approved` decision.

Verification: inspect the prompt and template against this criterion; confirm
the required headings and terms exist; run `git diff --check`.

## Forbidden actions

- Do not modify application code, credentials, deployment settings, or user
  changes.
- Do not claim the broader governance bootstrap is complete.

## Assumptions

- A repository-owned prompt plus required output template is the executable
  agent contract that the scheduled Master Delivery Agent loads for review.
- The remaining governance files are intentionally deferred to the approved
  implementation plan.

## Prompt issued

Create an independent Code Reviewer Agent that evaluates acceptance criteria,
correctness, quality, simplicity, reuse, SOLID architecture, performance,
security, tests, and documentation; emits evidence-backed P0–P3 findings; and
never self-approves or makes hidden changes.

## Actions log

- Created the reviewer prompt and required review template in an isolated
  worktree.
- Created the agent bootstrap index and this task record.

## Files changed

- `.agent/README.md`
- `.agent/prompts/code-reviewer-agent.md`
- `.agent/templates/code-review.md`
- `.agent/tasks/TASK-001-code-reviewer-agent.md`

## Evidence

- Content review must confirm all agreed review dimensions, P0–P3 priorities,
  independent/read-only authority, acceptance-criteria assessment, and a
  Master Agent handoff.

## Review result

- Review report: `.agent/reviews/REVIEW-TASK-001-002.md`.
- Reviewer/model/effort: Fresh independent Code Reviewer Agent,
  `gpt-5.6-terra` / high (`/root/governance_rereview`), read-only.
- Decision: `approved`.
- Open findings: None; the report records no P0–P3 findings.

## Decisions and handoff

The exact approved review permits the focused governance commit/push gate; no
follow-up task is required. The Master Delivery Agent must continue to load
`.agent/prompts/code-reviewer-agent.md` for every completed-task handoff.

## Git result

- Implementation commit: `9ded1ad6f06569f799c17ae114e7eed936bb7c73`
- Reconciled branch tip: `e41931d` is reachable from the governed base.
- Branch: `codex/code-reviewer-agent` tracks
  `origin/codex/code-reviewer-agent` at `e41931d`.
- Push: confirmed on the tracked remote branch.
