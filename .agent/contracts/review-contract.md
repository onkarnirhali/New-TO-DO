# Review contract

The reviewer is independent, read-only, and receives a frozen handoff packet. The reviewer does not repair code, approve its own work, or infer missing evidence.

## Required review inputs and output

Inspect the exact frozen manifest/hash, changed-file list, task contract, acceptance mapping, commands/results, sensitive-value omission statement, routing rationale, and escalation log. Re-run proportionate checks where possible and record exact commands and outcomes.

The review packet must include:

- Task ID, acceptance IDs, intended one-outcome scope, branch/worktree, and frozen diff/hash.
- Criterion-by-criterion `verified`, `failed`, or `blocked` assessment with file/evidence references.
- Findings classified P0–P3, each with impact, required action, owner, and verification step.
- Explicit decision: exactly one of `approved`, `approved-with-follow-ups`, `changes-required`, or `blocked`.
- Reviewer model/effort, review timestamp, evidence inspected, and any escalation decision.

P0 means security breach, data loss, outage, or destructive defect. P1 means acceptance failure or material user-facing bug. Any P0/P1 blocks completion. P2/P3 follow-ups must remain traceable and do not become implicit approval.

## Delivery rule

Only the exact decision `approved`, with no P0/P1 findings and all required tests/build/review gates green, permits commit or push. Every other decision forbids commit/push and returns the task to the Master Delivery Agent for remediation, clarification, or decomposition.
