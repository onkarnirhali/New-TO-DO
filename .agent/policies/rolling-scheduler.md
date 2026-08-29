# Rolling Scheduler Policy

The Master Delivery Agent uses this policy at each three-hour automation run
and whenever a coding slot becomes reusable. Scheduling remains
controller-driven: this policy defines the decision and evidence required; it
does not authorize autonomous merge, push, deployment, credential, provider,
billing, protected-branch, or production-data actions.

## Capacity and queue guard

- The default capacity is five total slots: `3 coding + 1 verifier + 1
  reviewer`.
- A completed ticket awaiting review occupies the review queue. The review
  queue maximum is two tickets. When two tickets await review, start no new
  coding; convert available coding capacity to verification, review, freeze,
  or reconciliation support until the queue is below two.
- Coding scopes must be non-overlapping and each coding ticket must use its own
  dedicated branch and worktree. Shared resources remain serialized under the
  file-ownership policy.

## Rolling allocation algorithm

Before assigning any new coding ticket, record the following in run evidence:

1. Inspect the ready queue and select the highest-priority ready ticket whose
   dependencies, owner, allowed files, conflict risk, route, timebox, tests,
   and stop condition are explicit.
2. Compute the time until the next three-hour automation run from the current
   run timestamp. Apply a strict start guard: new coding is allowed only when
   **more than 45 minutes** remain (`time_until_next_run > 45 minutes`). At
   exactly 45 minutes, or below it, do not start coding.
3. Confirm that an available coding slot exists, the review queue is below its
   maximum, the selected scope does not overlap active work, and the ticket is
   sized to reach `handoff-ready` within the remaining window. Scope fit must
   include the expected verification handoff; do not start a ticket that can
   only be left half-coded at the next run.
4. If every guard passes, assign exactly the next bounded ticket to the
   available developer, record the route and rationale, and start it in a new
   dedicated worktree.
5. If any guard fails, assign no new coding. Finish verification, independent
   review, remediation triage, documentation, reconciliation, or freeze work;
   preserve the ready queue for the next run.

`handoff-ready` is the earliest safe reuse point for a developer slot. Once a
developer has stopped editing and frozen the handoff manifest, that developer
may take another independent ticket only in a new worktree. Verification and
review of the prior frozen ticket continue independently; reuse never permits
editing the prior worktree or changing its frozen files.

## Blocked-task behavior

A blocked task must report the concrete blocker and stop consuming coding
capacity. The Master may clarify missing context, escalate to the route
required by `.agent/policies/model-routing.md` and `.agent/policies/escalation.md`,
or decompose the task into bounded tickets with explicit dependencies. It may
then re-enter the ready queue only after the blocker and evidence requirement
are resolved. Never silently retry, broaden scope, waive a gate, or leave a
blocked task running merely to fill a slot.

Review findings become focused remediation work. P0/P1 findings interrupt the
active delivery plan; P2/P3 findings remain traceable follow-ups. A new
remediation ticket follows the same queue, scope, worktree, timebox, routing,
and 45-minute guard.

## Escalation triggers and record

Escalate immediately when a ticket encounters security-sensitive code,
authentication or authorization, provider access or external side effects,
database/schema/migration/query changes, cross-module integration, unexpected
scope growth beyond its packet, or repeated test or review failure. Use the
route in the model-routing policy; do not silently downgrade or continue across
the boundary.

Every escalation record must identify:

- prior route (`model / effort`);
- new route (`model / effort`);
- concrete trigger and reason;
- affected acceptance IDs and files;
- owner decision, when approval is required; and
- timestamp and next action.

The escalated agent stops at the boundary while the route is decided. An
escalation does not authorize forbidden actions or change acceptance criteria.
Independent review remains a fresh `gpt-5.6-terra / high` read-only decision;
only exact `approved`, with no P0/P1 findings and all required gates green,
permits the Master to consider commit or push.

## Required run evidence

For each scheduling decision, record the ready-queue snapshot, review-queue
depth, active-slot allocation, current timestamp, time until next run, the
strict `>45`-minute guard result, scope-fit result, selected/no-selected
ticket, worktree, model route, escalations, and next action. Evidence must use
stable identifiers and omit credentials, tokens, personal data, and provider
secrets.
