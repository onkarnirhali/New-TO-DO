# TASK-001 — Create Code Reviewer Agent definition

- Status: verified
- Acceptance criteria: AC-GOV-REVIEW-01
- Owner: Master Delivery Agent
- Assigned agent: Codex
- Branch/worktree: `codex/code-reviewer-agent`

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

Independent specification review: approved with no findings.

Independent quality review: initially identified missing bootstrap acceptance
evidence, ambiguous commit/push wording, incomplete follow-up traceability,
missing review provenance, and an overly rigid handoff phrase. All findings
were corrected and the independent re-review approved with no P0–P3 findings.

Reviewer decision: approved. Commit/push permitted: yes, subject to the
non-protected-branch policy.

## Decisions and handoff

After independent review, update this record with the decision, verification,
Git result, and any follow-up work. The Master Delivery Agent must load
`.agent/prompts/code-reviewer-agent.md` for every completed-task handoff.

## Git result

- Commit: `6266bdb93440c7e5f525addb852a1ea90c829325`
- Branch: `codex/code-reviewer-agent`
- Push: blocked — this repository currently has no configured Git remote.
