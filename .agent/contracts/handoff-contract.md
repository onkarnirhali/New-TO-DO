# Handoff contract

The developer creates this packet at `handoff-ready`; the verifier and reviewer consume the same frozen input. Handoff is a stop point, not permission to commit.

## Required handoff evidence

- Task ID, owner, current lifecycle status, branch, and absolute dedicated worktree.
- One user-visible outcome and an acceptance-criteria mapping with status.
- Exact changed-file list, including added, modified, and deleted files; no broad globs.
- Allowed/forbidden scope, dependencies, conflict risk, assumptions, and escalation history.
- Exact commands run, exit codes, and concise results for tests, type-check, lint, build, and relevant integration/security checks.
- Sensitive-value omission statement: confirm that logs and packet contain no credentials, tokens, personal data, or provider secrets.
- Frozen manifest and content hash (or frozen diff/base-to-head hash) captured after the final edit; later edits invalidate the handoff.
- Routing rationale: selected model/effort and any prior-to-new route escalation.
- Open findings/blockers and the exact next action for verification.

The receiving verifier confirms the manifest before testing. Any change after freezing returns the task to `coding` and requires a new handoff. The developer may start another ticket only in a new dedicated worktree with a non-overlapping scope; verification and review of this packet continue independently.

## Completion gate

Handoff evidence is necessary but not sufficient for delivery. The reviewer must issue an explicit decision. Only exact `approved`, with no P0/P1 findings and green required gates, permits commit/push; `approved-with-follow-ups`, `changes-required`, or `blocked` never permits either action.
