# Planote Agent Operating System Design

**Status:** Approved design  
**Date:** 2026-08-29  
**Scope:** Planote repository delivery workflow

## Goal

Increase productive coding time without reducing testing, security, review, or traceability. The system supports five active slots, reusable Markdown instructions, rolling task allocation, and dynamic model routing.

## Capacity and rolling allocation

Default mix: **3 coding agents + 1 verification agent + 1 reviewer/integrator**. The scheduler may use 4 coding + 1 reviewer or 2 coding + 2 verifiers + 1 reviewer when scopes require it. A review queue may not exceed two tickets; when it does, a coding slot becomes verification support.

Lifecycle:

```text
planned → coding → handoff-ready → verification → review → approved → committed → pushed
```

At `handoff-ready`, the developer may start the next independent ticket in a new worktree while verification/review continues. Before starting coding, calculate time until the next three-hour automation run. Start only when more than 45 minutes remain and the ticket can reach `handoff-ready` within that window. At 45 minutes or less, start no new coding; finish tests, review, documentation, and handoff.

## Reusable instruction layers

Universal rules remain in `AGENTS.md`. Reusable Planote rules are versioned under `.agent/`:

```text
.agent/
  prompts/common/{planner,implementation,verification,reviewer,integration}-agent.md
  contracts/{task,handoff,review}-contract.md
  policies/{model-routing,parallelism,file-ownership,escalation}.md
  templates/{task-ticket,verification-report,review-packet,run-metrics}.md
```

Every delegation combines those common layers with a task-specific packet containing objective, acceptance criteria, allowed/forbidden files, dependencies, evidence, timebox, model route, and stop condition. Common files are reviewed like code; packets do not duplicate them.

## Dynamic model routing

| Work | Route |
|---|---|
| Routine coding, small UI, fixtures, docs, mechanical refactor | `gpt-5.6-luna / medium` |
| Routine verification | `gpt-5.6-luna / medium` |
| Auth, authorization, database, providers, security, integration | `gpt-5.6-terra / high` |
| Independent review and final reconciliation | `gpt-5.6-terra / high` |
| Architecture, decomposition, major decisions | `gpt-5.6-terra / ultra` |

Luna cannot approve work or make delivery decisions. A task escalates to Terra/high when it becomes security-sensitive, provider-dependent, cross-module, or materially larger than its packet; the reason is recorded.

## Isolation and parallelism

Each coding task has a dedicated branch/worktree and declares editable files, read-only files, dependencies, conflict risk, expected handoff time, tests, and reviewer. Active coding tasks may not edit overlapping files. Shared lockfiles and contracts are serialized integration resources. Agents do not commit, push, merge, deploy, change credentials, mutate production data, or self-approve.

## Verification and review

Verification begins at `handoff-ready`, is read-only, and runs focused/full tests, lint, type-check, build, lockfile validation, diff check, and governed validation. Formal review inspects the exact frozen diff, acceptance mapping, security, quality, simplicity, documentation, and routing. Only an exact `approved` decision with no P0/P1 findings permits commit/push.

## Ticket sizing and metrics

Tickets should deliver one user-visible outcome, touch one subsystem, and normally take 20–40 minutes to reach `handoff-ready`. Every run records planning/preflight, coding, test/verification, review, remediation, documentation, waiting, tickets started/completed/reworked, queue depth, and coding percentage. Initial target: raise coding time from 10–28% to 40–50% without reducing gates.

## Failure behavior and success criteria

Agents report `DONE`, `DONE_WITH_CONCERNS`, `NEEDS_CONTEXT`, or `BLOCKED`. Blocked tasks are clarified, escalated, or decomposed; they are not silently retried. Review findings create focused remediation tickets; only P0/P1 findings interrupt the active plan.

Success means three independent tickets can move through coding, verification, and review in one automation cycle without scope conflicts; a finished developer can start the next ready ticket; the 45-minute guard prevents unsafe late starts; and metrics show more coding time with unchanged quality gates.
