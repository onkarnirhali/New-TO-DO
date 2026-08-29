# Planote Agent Control Files

This directory contains the repository-owned instructions, contracts, policies,
and evidence records used by the Master Delivery Agent. The operating design is
human/controller-driven; these files do not grant autonomous merge, push,
deployment, credential, provider, billing, protected-branch, or production-data
authority.

## Agent roles

- `prompts/code-reviewer-agent.md` defines the independent, read-only Code
  Reviewer Agent. The Master Delivery Agent must load it as the authoritative
  review contract and attach a documented, task-specific input packet when
  handing over a completed task.
- `templates/code-review.md` is the required evidence record for every review.

## Operating policies

- `policies/model-routing.md` is the source of truth for dynamic model and
  effort selection. Routine coding and verification use `gpt-5.6-luna` /
  medium; sensitive, integration, review, and reconciliation boundaries use
  `gpt-5.6-terra` / high; architecture and decomposition use Terra / ultra.
  Luna cannot approve or make delivery decisions.
- `policies/rolling-scheduler.md` is the source of truth for rolling allocation:
  inspect the ready queue, compute time until the next three-hour automation
  run, and start a bounded ticket only when **more than 45 minutes** remain,
  scope fits `handoff-ready`, capacity is available, and the review queue is
  below two. `handoff-ready` is the earliest safe reuse point; every new ticket
  gets a new worktree.
- `policies/parallelism.md` defines the five-slot default (`3 coding + 1
  verifier + 1 reviewer`), non-overlapping scopes, and the review queue maximum
  of two. When two completed tickets await review, coding stops and capacity
  shifts to verification/review support.
- `policies/escalation.md` defines the required prior-route, new-route, reason,
  affected scope, owner decision, timestamp, and next-action record for
  security, auth/authorization, provider, database, cross-module, scope-growth,
  and repeated test/review failures. Blocked work is clarified, escalated, or
  decomposed; it is never silently retried.

## Delivery gate

Verification is read-only and begins at `handoff-ready`. Independent review is
fresh `gpt-5.6-terra` / high and inspects the exact frozen manifest. Only an
exact `approved` decision with no P0/P1 findings and all required gates green
permits the Master to consider commit or push; all other outcomes block
delivery.

Governance, acceptance registry, delivery ledger, task templates, and validation
tooling are maintained alongside these policies. The Master should load the
applicable contracts and task-specific packet before each assignment, and must
record queue state, timing guard, routing, worktree, evidence, and next action
in the run record.

## Run metrics and adoption

- `templates/run-metrics.md` defines the per-run, secret-free measurement
  record. `metrics/delivery-metrics.yaml` is the append-only metrics schema and
  historical baseline.
- Track planning, coding, testing, review, remediation, documentation, and
  waiting minutes; tickets started/completed/reworked; queue depth; model
  routes; escalations; and coding percentage. The operating target is 40–50%
  coding time. Unknown historical values stay explicitly unknown.
- The TASK-017/TASK-018 baseline observed approximately 10–28% coding time,
  with setup, serial verification, and review remediation as the main
  overheads. Agent OS is ready for the next run but has not been measured in
  production use.
