# Review Policy

## Independence

- The implementer must not approve its own task.
- The Code Reviewer Agent is read-only by default and reports evidence-backed
  findings rather than silently fixing code.
- A review must identify the frozen diff, task, acceptance criteria, evidence,
  commands inspected, and decision.

## Priorities

- `P0`: security breach, data loss, outage, or destructive defect.
- `P1`: acceptance-criteria failure or material user-facing bug.
- `P2`: maintainability, reliability, performance, or architecture issue that
  must be planned.
- `P3`: non-blocking improvement.

P0 and P1 block completion. Only the exact decision `approved`, with all
required gates green, permits a focused commit and push to a dedicated
non-protected branch. `approved-with-follow-ups`, `changes-required`, and
`blocked` never permit commit or push.

## Skill promotion

A reusable skill requires a pattern observed at least twice, a documented draft,
real repository examples or tests, and independent reviewer approval. Owner
approval is also required for governance, security, deployment, credential,
deletion, or acceptance-criteria skills.
