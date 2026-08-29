# Task contract

Every delegated task has one contract and one owner. The contract is the authoritative boundary for the worktree and must be complete before coding starts.

## Required fields

- **Task ID and title:** stable `TASK-<NNN>` identifier.
- **User-visible outcome:** exactly one observable product, reliability, or governance outcome.
- **Acceptance IDs:** exact registry IDs and a testable mapping for each.
- **Allowed files:** explicit paths or path patterns; edits outside this list are forbidden.
- **Forbidden files/actions:** protected branches, credentials, unrelated product scope, and unapproved destructive or external actions.
- **Dependencies and conflict risk:** prerequisite tasks, shared resources, and whether another task can touch the same paths.
- **Owner boundaries:** assigned agent owns implementation and evidence; verifier owns independent checks; reviewer owns the decision; Master Delivery Agent owns scheduling and delivery gates.
- **Model/effort and complexity rationale:** exact model identifier, reasoning effort, and why the route fits.
- **Timebox:** start, deadline, and a stop/escalation point.
- **Commands/tests:** exact intended commands, fixtures, and expected result.
- **Evidence:** changed-file manifest, command output, acceptance mapping, and frozen diff/hash.
- **Stop condition:** stop at handoff-ready, a blocking finding, scope growth, missing dependency, or failed gate; do not silently retry or expand scope.

## Lifecycle

`planned → coding → handoff-ready → verification → review → approved → committed → pushed`

Transitions require a timestamped status update and evidence. `handoff-ready` means the developer has stopped editing, frozen the manifest, and supplied the handoff contract. Verification and review are independent stages. Only the exact reviewer decision `approved`, with no P0/P1 findings and all required gates green, may transition to `committed` or `pushed`.

## Authority and safety

The task contract cannot override `.agent/governance/INVARIANTS.md`, the authority matrix, acceptance criteria, or owner approval requirements. A model may recommend escalation but cannot approve its own work. Secrets and sensitive values must never appear in tickets, logs, diffs, or evidence.
