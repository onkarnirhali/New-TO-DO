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
3. Route planning and major technical decisions to `gpt-5.6-terra` / ultra;
   route every implementation task to `gpt-5.6-terra` / high. Reserve
   `gpt-5.6-luna` / medium for routine verification against documented
   guidelines and criteria only.
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
