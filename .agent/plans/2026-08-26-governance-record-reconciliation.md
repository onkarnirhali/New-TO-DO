# Governance Lifecycle Record Reconciliation Plan

**Goal:** Make the governance ledger, task records, registry, and memory accurately reflect the existing approved reviews and reachable commits before starting web-foundation delivery.

**Architecture:** This is a documentation-only reconciliation. Immutable Git commits and independent review reports remain the evidence; task and acceptance statuses are synchronized to those facts without changing governance policy, prompts, validators, product code, or acceptance-criterion text.

**Tech Stack:** Markdown, YAML, Git reachability, and the existing governance validator.

## Scope and boundaries

- Update only lifecycle status, evidence, review-result, Git-result, and concise progress/memory fields that are directly supported by the current repository.
- Preserve historical provenance and existing review reports verbatim.
- Do not infer exclusive task-to-commit ownership solely from ancestry; cite the documented implementation commit or the consolidated bootstrap commit only where the task/review evidence supports it.
- Do not modify `.agent/governance/**`, `.agent/prompts/**`, `scripts/**`, product source, package manifests, credentials, external automation, or the dirty primary checkout.

## Task steps

1. Confirm the evidence map for TASK-001 through TASK-010: final review decision, recorded implementation commit, branch reachability, and tracking-branch state.
2. Synchronize TASK-001 through TASK-009 from `review` to `verified` only where an exact approved report and required evidence exist; keep TASK-010 verified and fill its stale Git result.
3. Add the required verified-task evidence to the ledger; update AC-GOV-01 through AC-GOV-03 and M0-GOVERNANCE only with evidence that maps directly to them.
4. Update product memory, a concise progress report, this task record, and `CONVERSATION_MEMORY.md` with the reconciliation outcome and remaining product priority.
5. Run `pnpm agent:validate`, `pnpm agent:test`, and `git diff --check`; freeze the task diff and create the reviewer packet.
6. Stop for a fresh independent `gpt-5.6-terra` / high Code Reviewer Agent. Only its exact `approved` decision plus green gates permits the Master Agent to commit and push this branch.

## Verification stop condition

The task is ready for review only when the reconciliation is limited to the allowed documentation files, all three local commands pass, and the packet contains the frozen diff, changed-file list, evidence map, model rationale, and repository memory.

## Execution record

- Evidence mapping confirmed: TASK-001 has documented reviewer-branch history,
  TASK-002 has documented implementation commit `e2cf113`, TASK-003 through
  TASK-009 are supported by consolidated commit `1704ed4` without claiming
  exclusive per-task SHA ownership, and TASK-010 is committed at `4ee22c0`.
- The governed baseline `4ee22c055b6258fa09d05d67e87ae192f6c4ca5e` is clean
  and its `codex/governance-bootstrap` tracking branch is confirmed at that
  commit. This task stops at a fresh independent review packet; it does not
  make a review decision or create a Git commit.
