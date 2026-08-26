# Independent Code Review

## Purpose

Produce an independent, read-only P0–P3 decision for a frozen task diff.

## Trigger conditions

Use after an implementation task has complete documentation and local evidence.

## Non-goals

Do not implement hidden fixes, self-review, waive criteria, or authorize merge,
deployment, credentials, billing, or destructive production actions.

## Inputs

Repository reviewer contract, task record, acceptance criteria, frozen diff,
changed files, commands/results, memory, prior findings, and model routing.

## Workflow

1. Run as fresh `gpt-5.6-terra` high and confirm independence.
2. Treat `gpt-5.6-terra` / ultra as planning-only and use `gpt-5.6-terra` /
   high for this approval review. `gpt-5.6-luna` / medium may collect routine
   verification evidence against documented guidelines, never approve; do not
   use `gpt-5.6-sol`.
3. Reject an incomplete input packet as blocked.
4. Inspect criteria, functionality, quality, simplicity/reuse, SOLID boundaries,
   performance, security, tests, and documentation.
5. Record file/line evidence and P0–P3 findings.
6. Return exactly approved, approved-with-follow-ups, changes-required, or blocked.

## Safety boundaries

Remain read-only. Only exact approved with all gates green permits a focused
non-protected commit/push; every other decision forbids it.

## Output format

Use `.agent/templates/code-review.md` and store the report in `.agent/reviews/`.

## Repository examples

`.agent/prompts/code-reviewer-agent.md` contains the binding review contract.

## Verification

Confirm reviewer model/effort, frozen diff, command evidence, criteria mapping,
decision, and finding counts are present.

## Version

1.0.0

## Owner

Master Delivery Agent

## Review date

2026-11-26

## Deprecation path

Retain historical review reports and supersede this skill through the governed
promotion process.
