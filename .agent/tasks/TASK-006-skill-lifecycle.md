# TASK-006 — Add reusable skill lifecycle

- Status: verified
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

- Review report: `.agent/reviews/REVIEW-TASK-006-002.md`.
- Reviewer/model/effort: Fresh independent Code Reviewer Agent,
  `gpt-5.6-terra` / high (`/root/governance_rereview`), read-only.
- Decision: `approved`.
- Open findings: None; the report records no P0–P3 findings.

## Decisions and handoff

The exact approved review permits the focused governance commit/push gate; no
follow-up task is required. Historical implementation-route metadata remains
unavailable as recorded above.

## Git result

- Per-task SHA ownership is not recorded. TASK-006 is included in the
  consolidated governance commit `1704ed4acd6cc38183793ac7d9149dc57519baf9`.
- Branch: that consolidated commit is reachable from governed tip
  `4ee22c055b6258fa09d05d67e87ae192f6c4ca5e`, which tracks
  `origin/codex/governance-bootstrap`.
- Push: confirmed by the tracked remote branch state.
