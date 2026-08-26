# Acceptance Criteria Review

## Purpose

Trace stable acceptance IDs from approved prose to implementation and evidence.

## Trigger conditions

Use when creating tasks, reconciling status, or reviewing a claimed criterion.

## Non-goals

Do not invent scope, change owner-controlled criteria, or equate source presence
with verification.

## Inputs

Master delivery plan, registry, ledger, task records, frozen diff, tests, review
reports, and provider/browser evidence required by the criterion.

## Workflow

1. Locate the exact stable AC ID and approved criterion.
2. Map every clause to code, tests, and required external evidence.
3. Record missing clauses as not-started/blocked rather than partial success.
4. Advance to implemented only when the whole implementation exists.
5. Advance to verified only after all gates and independent approval.

## Safety boundaries

Acceptance or governance changes require owner approval. Never waive security,
accessibility, ownership, real-provider, migration, or review requirements.

## Output format

Update registry evidence, traceability, task record, and review assessment.

## Repository examples

`AC-AUTH-05` records an API guard as partial evidence without claiming the full
web route-protection criterion is implemented.

## Verification

Run `pnpm agent:validate` and check each criterion clause against direct links.

## Version

1.0.0

## Owner

Master Delivery Agent

## Review date

2026-11-26

## Deprecation path

Supersede only after independent review and owner approval for criteria policy.
