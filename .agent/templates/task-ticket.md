# TASK-<NNN> — <concise title>

- Status: planned | coding | handoff-ready | verification | review | approved | committed | pushed | blocked
- User-visible outcome (one): <observable result>
- Acceptance IDs: AC-<AREA>-<NN>, ...
- Owner / assigned agent: <name / run>
- Branch/worktree: <branch / absolute dedicated path>
- Model/effort: <exact model> / <effort>
- Complexity and routing rationale: <reason>
- Escalation: none | <from → to, reason, decision>
- Timebox: <start>–<stop>; stop condition: <condition>
- Dependencies: <tickets/resources>
- Conflict risk: low | medium | high — <why>

## Allowed files

- `<exact/path>`

## Forbidden files and actions

- <paths/actions>

## Tests and commands

- `<command>` — expected: <result>

## Evidence and acceptance mapping

| Acceptance ID | Expected evidence | Result |
|---|---|---|
| AC-<AREA>-<NN> | <test/file/output> | pending |

## Actions log

| Time | Status/action | Result/evidence |
|---|---|---|

## Handoff / review / Git

- Exact changed files:
- Sensitive-value omission statement:
- Frozen manifest/hash:
- Handoff packet: `.agent/...`
- Review packet/decision:
- Commit/push: permitted only after exact `approved`, no P0/P1, and green gates.

## Runnable example: rolling handoff

`TASK-021` (routine UI copy correction) is assigned `gpt-5.6-luna / medium` in `C:\worktrees\TASK-021`, allowed only `apps/web/src/components/layout/AppShell.tsx`, with one acceptance ID and a 30-minute timebox. The developer runs the listed lint/test command, records the exit code, confirms no sensitive values, freezes the exact changed-file manifest/hash, and changes status to `handoff-ready`. The verifier starts against that frozen packet and the reviewer begins independent read-only review.

The developer then stops touching `TASK-021`, creates a new branch/worktree `C:\worktrees\TASK-022` for a separate ticket with no overlapping files, and begins `TASK-022` while `TASK-021` remains in verification/review. If verification finds a change, `TASK-021` returns to coding and receives a new freeze; the developer does not edit the review packet or reuse the old worktree for `TASK-022`.
