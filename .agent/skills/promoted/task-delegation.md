# Task Delegation

## Purpose

Create bounded implementation packets with explicit ownership and evidence.

## Trigger conditions

Use when the Master delegates an approved acceptance-scoped task.

## Non-goals

Do not design product scope, approve work, or coordinate overlapping edits.

## Inputs

Task ID/record, acceptance criteria, dependency state, allowed/forbidden files,
worktree, model/effort routing, repository memory, and verification commands.

## Workflow

1. Confirm dependencies and a clean isolated worktree.
2. Ensure concurrent tasks have non-overlapping file ownership.
3. Apply the dynamic model-routing policy: route routine low-risk coding and
   routine verification to `gpt-5.6-luna` / medium; route authentication,
   authorization, database, provider, security, and cross-module integration
   work to `gpt-5.6-terra` / high; route independent review and final
   reconciliation to `gpt-5.6-terra` / high; and route planning, architecture,
   decomposition, and major technical decisions to `gpt-5.6-terra` / ultra.
   Luna may implement only the bounded routine low-risk scope and collect
   documented verification evidence. When work crosses a boundary, pause and
   record the prior route, new route, concrete escalation reason, affected
   scope, and owner decision when required before continuing.
4. Record scope, model rationale, prompt, assumptions, and required evidence.
5. Dispatch one bounded task and monitor documented progress.
6. Reconcile claims against the diff and commands before reviewer handoff.

## Safety boundaries

Never delegate into the dirty primary checkout, allow self-approval, overlap
files without a documented ownership transfer, expose secrets, or authorize
external/protected actions. Luna verification is evidence collection only and
cannot implement, approve, or make a delivery decision. Do not use `gpt-5.6-sol`.

## Output format

Use `.agent/templates/agent-handoff.md` and the linked task record.

## Repository examples

`.agent/tasks/TASK-003-acceptance-ledger.md` demonstrates acceptance, routing,
scope, evidence, and handoff fields.

## Verification

Validate task/ledger links with `pnpm agent:validate`; inspect worktree and diff
ownership before and after delegation.

## Version

1.0.0

## Owner

Master Delivery Agent

## Review date

2026-11-26

## Deprecation path

Supersede with a reviewed version; retain old task packets for audit history.
