# Release Verification

## Purpose

Verify a candidate task or release from fresh commands and provider prerequisites.

## Trigger conditions

Use before completion claims, commits, pushes, merge requests, or release review.

## Non-goals

Do not deploy, publish, merge protected branches, configure credentials, or
treat placeholder-provider checks as real integration evidence.

## Inputs

Candidate SHA/diff, task/acceptance records, required commands, migration path,
provider prerequisites, Git state, reviewer decision, and recovery plan.

## Workflow

1. Confirm the exact candidate diff and clean scoped worktree.
2. Route routine documented checks to `gpt-5.6-luna` / medium: run the
   documented governance tests, unit/integration tests, lint, type-check, and
   build, then compare output to the documented guidelines and criteria. Route
   authentication, authorization, database, provider, security, integration,
   or non-routine interpretation checks to `gpt-5.6-terra` / high.
3. Run applicable migration, browser, accessibility, security, and real-provider
   checks; record unavailable credentials as blockers without exposing values.
4. Confirm documentation, ledger, traceability, and independent review. Final
   reconciliation is a `gpt-5.6-terra` / high responsibility and remains
   separate from routine Luna verification.
5. Record exact output, exit status, warnings, SHA, branch, and push status.

## Safety boundaries

Never weaken gates or infer success from earlier runs. Owner approval remains
required for protected merges, deployment, credentials, billing, and live data.
Luna may implement only bounded routine low-risk coding when explicitly routed,
and may verify routine documented checks, but cannot approve or make delivery
decisions. Planning/architecture uses `gpt-5.6-terra` / ultra; sensitive,
integration, review, and final reconciliation work uses `gpt-5.6-terra` / high.
Record the selected route and rationale, and every escalation with prior route,
new route, reason, affected scope, and owner decision when required. Do not use
`gpt-5.6-sol`.

## Output format

Use `.agent/templates/progress-report.md` plus task and ledger evidence fields.

## Repository examples

Implementation Plan Task 7 lists the required governance and root command set.

## Verification

Every success claim cites a fresh command with zero failures and the exact
candidate SHA; unresolved provider prerequisites remain explicit blockers.

## Version

1.0.0

## Owner

Master Delivery Agent

## Review date

2026-11-26

## Deprecation path

Supersede through draft, validation, independent review, and owner approval when
the change affects release or deployment governance.
