# TASK-002 — Add delivery governance invariants

- Status: review
- Acceptance criteria: AC-GOV-01
- Owner: Master Delivery Agent
- Assigned agent: implementation-agent
- Branch/worktree: `codex/governance-bootstrap`
- Model/effort: gpt-5.6-luna / medium
- Complexity rationale: Bounded documentation and a small Node validator with a
  clear test-first specification.
- Escalation: none

## Historical provenance

This factual Luna/medium route predates the current policy that reserves
Terra/high for implementation. It is retained as recorded evidence, not
retroactively normalized.

## Scope

Add the non-negotiable governance, authority, documentation, and review policy
files. Add a Node validator that verifies their required presence.

### AC-GOV-01 — Governance policy is present and enforceable

The repository contains the four required governance files. They define action
documentation, verification evidence, independent review, P0/P1 blocking,
secret protection, file-to-task traceability, owner-only external actions, and
protected-branch/deployment boundaries. The validator rejects a missing file
and accepts a complete file set.

Verification: `node scripts/validate-agent-governance.test.mjs` and
`git diff --check`.

## Forbidden actions

- Do not change application code, credentials, deployment configuration, or
  unowned user changes.
- Do not push or merge before independent approval.

## Assumptions

- The four markdown policies are the owner-controlled source of truth pending
  the later registry and ledger implementation.

## Prompt issued

Implement the first approved governance-plan task test-first: add the four
policy files and a validator whose failure clearly identifies a missing policy.

## Actions log

- Created an isolated worktree from current `main`.
- Installed locked workspace dependencies and recorded the prior no-test
  baseline.
- Added the validator test before its implementation; observed the expected
  module-missing failure.
- Added policies and minimal validator; re-ran tests successfully.
- Independent review found that the validator accepted a directory as a policy
  file. Added the regression test first, observed its failure, then required
  each path to be a regular file.

## Files changed

- `.agent/governance/INVARIANTS.md`
- `.agent/governance/authority-matrix.md`
- `.agent/governance/documentation-policy.md`
- `.agent/governance/review-policy.md`
- `.agent/tasks/TASK-002-governance-invariants.md`
- `scripts/validate-agent-governance.mjs`
- `scripts/validate-agent-governance.test.mjs`

## Evidence

- `node scripts/validate-agent-governance.test.mjs`: 3 passed, 0 failed.
- `git diff --check`: passed.
- Consolidated gate: `pnpm agent:validate`, 22/22 governance tests, lint,
  type-check, build, and `git diff --check` passed; root `pnpm test` executed
  zero configured package test tasks.

## Review result

Historical independent review found a P1 directory-path false positive in the
validator. The targeted regression test and regular-file check were added.
That re-review was recorded only in this task, without the now-required review
artifact and model/effort provenance. Fresh Terra/high review is pending;
commit/push permission is currently no.

## Decisions and handoff

The next governance task adds the machine-readable acceptance registry and
delivery ledger. Do not mark this task verified or commit it until independent
review is approved.
