# Planote Master Delivery Controller Setup

## Codex app configuration

1. Create a Codex Automation named `Planote Master Delivery Controller`.
2. Set the schedule to **Every 3 hours** in **Europe/London**.
3. Copy `.agent/prompts/master-delivery-agent.md` as its instruction.
4. Attach this repository/workspace context.
5. Start with mode `dry-run-first`.
6. Keep the sprint budget at **90 minutes**, with no more than **two** independent
   implementation agents and a report readable in **three minutes**.
7. Review the first dated report and all Tasks 1–6 governance evidence.
8. Enable delegation only after owner review and an exact independent
   `approved` decision for the bootstrap.

The controller may make a focused commit and push only when a fresh independent
`gpt-5.6-terra` high Code Reviewer returns exactly `approved` with every gate
green. It may push only to a dedicated non-protected branch. It must never
merge, deploy, publish, release, change credentials/provider permissions,
perform billing actions, or delete live data without explicit owner approval.

## Dry-run-first gate

Until governance validation, root checks, reviewer evidence, delivery-ledger
reconciliation, and the baseline report are complete, the automation may only
read and report. It must not edit repository files, delegate, commit, push, or
change configuration. Once the owner approves the reviewed bootstrap, the
manifest can remain `dry-run-first` as historical configuration while the
ledger records that delegation is enabled.

## Required dry-run report

```md
# Automation Run — <ISO-8601 timestamp>

- Mode: dry-run
- Ledger reconciliation:
- Active agents:
- Stale or blocked tasks:
- Ready for review:
- Reviewer findings:
- Next acceptance criteria:
- Actions deliberately not taken:
- Owner decisions required:
- Model routing and rationale:
- Verification evidence:
- Release-candidate verified:
- Implemented-but-unverified:
- Remaining:
- Deferred:
- Implementation progress:
- Blockers:
- Next action:

## How to test locally

Give simple local UI test steps when UI work is in scope, or explain why no UI
test applies. Keep the full report in plain English and readable in under three
minutes. Include the exact `Onkar We need your help` heading only when an
owner-controlled external dependency requires the owner's action.
```

Store reports in `.agent/reports/automation-runs/` and link them from the
delivery ledger and `CONVERSATION_MEMORY.md`.

## Operational control loop

The automation must reconcile evidence before planning, prioritize P0/P1 work,
create acceptance-scoped non-overlapping tasks, route models per the repository
prompt, use isolated worktrees, require complete reviewer packets, and update
all task/review/ledger/progress/memory records. It must run the 90-minute sprint
defined by the Master prompt, perform provider readiness preflight before Clerk,
database, storage, or other external work, and never invent scope or claim
success without fresh command output.
