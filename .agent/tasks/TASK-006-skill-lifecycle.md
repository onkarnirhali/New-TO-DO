# TASK-006 — Add reusable skill lifecycle

- Status: review
- Acceptance criteria: AC-GOV-02
- Owner: Master Delivery Agent
- Assigned agent: Codex
- Branch/worktree: `codex/governance-bootstrap`
- Model/effort: historical evidence unavailable
- Complexity rationale: historical evidence unavailable
- Escalation: historical evidence unavailable

## Historical provenance

The original record stated `current Codex implementation session / medium` and
described bounded governance documentation and metadata validation. It did not
preserve a concrete model identifier or escalation record, so these lifecycle
fields intentionally record historical evidence unavailable.

## Scope

Add draft, validated, and promoted lifecycle structure; a required template;
four initial promoted skills; metadata validation; and promotion policy.

## Forbidden actions

- Do not promote security, deployment, credential, deletion, governance, or
  acceptance skills without owner approval.
- Do not treat unreviewed patterns as reusable law.

## Assumptions

- Owner approval in this request authorizes creating the approved initial skill
  set; independent review is still mandatory before bootstrap verification.

## Prompt issued

Execute Implementation Plan Task 5 test-first and enforce the complete skill
lifecycle metadata and protected promotion policy.

## Actions log

- Added and observed failing skill-export and metadata tests.
- Implemented complete-heading validation.
- Added and observed a failing missing-promoted-skill repository test.
- Added lifecycle directories, template, and four promoted skill records.

## Files changed

- `.agent/skills/**`
- `.agent/governance/review-policy.md` (promotion policy already present)
- `.agent/tasks/TASK-006-skill-lifecycle.md`
- `scripts/validate-agent-governance.mjs`
- `scripts/validate-agent-governance.test.mjs`

## Evidence

- Tests: `pnpm agent:test` — 19 passed, 0 failed before skill creation; final
  task verification pending.
- Validator: `pnpm agent:validate` — passed.
- Type check: `pnpm type-check` — passed.
- Lint: `pnpm lint` — passed with 10 pre-existing web return-type warnings.
- Build: `pnpm build` — passed; root `pnpm test` ran zero package tasks.

## Review result

Pending fresh independent `gpt-5.6-terra` high review.

## Decisions and handoff

The consolidated review must confirm the promotion policy and metadata fields.

## Git result

Pending exact approved review.
