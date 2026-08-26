# Reviewer Input — TASK-011 Revision 2

## Task, review history, and authority

- Task record: `.agent/tasks/TASK-011-governance-record-reconciliation.md`.
- Review to remediate: `.agent/reviews/REVIEW-TASK-011-001.md` —
  `changes-required`, one P1 for non-reproducible frozen-source bytes.
- Acceptance criterion: AC-GOV-02; directly implicated lifecycle evidence for
  AC-GOV-01 and AC-GOV-03.
- Base SHA: `4ee22c055b6258fa09d05d67e87ae192f6c4ca5e`.
- Authority: documentation-only remediation. Do not modify policy, prompts,
  validators, product source, manifests, credentials, external automation,
  lifecycle mappings, historical reviewer artifacts, Git state, or the dirty
  primary checkout. The original packet and review remain verbatim evidence.

## P1 resolution request

The initial packet described a hash in prose but omitted an executable byte
stream. This revision defines exactly one source snapshot: bytes of
`git diff --binary --no-ext-diff <base>` prefixed by UTF-8 `TRACKED\0`, then
raw bytes for each sorted untracked source path framed by UTF-8
`UNTRACKED\0<path>\0`. The command validates the complete untracked set before
hashing, so reviewer artifacts cannot silently enter the source snapshot.

Please run the exact command below from the worktree root before creating any
new review report. It must print the stated hash twice in succession.

```powershell
node --input-type=module -e 'import { execFileSync } from "node:child_process"; import { createHash } from "node:crypto"; import { readFileSync } from "node:fs"; const base="4ee22c055b6258fa09d05d67e87ae192f6c4ca5e"; const source=[".agent/plans/2026-08-26-governance-record-reconciliation.md",".agent/reports/automation-runs/2026-08-26-governance-lifecycle-reconciliation.md",".agent/reports/progress/2026-08-26-governance-lifecycle-reconciliation.md",".agent/tasks/TASK-011-governance-record-reconciliation.md"].sort(); const artifacts=[".agent/reviews/REVIEW-TASK-011-001.md",".agent/reviews/packets/TASK-011-002-input.md",".agent/reviews/packets/TASK-011-input.md"].sort(); const actual=execFileSync("git",["ls-files","--others","--exclude-standard","-z"]).toString("utf8").split("\0").filter(Boolean).sort(); const expected=[...source,...artifacts].sort(); if (JSON.stringify(actual)!==JSON.stringify(expected)) throw new Error(`Unexpected untracked set: ${JSON.stringify(actual)}`); const hash=createHash("sha256"); hash.update(Buffer.from("TRACKED\0","utf8")); hash.update(execFileSync("git",["diff","--binary","--no-ext-diff",base])); for (const path of source) { hash.update(Buffer.from(`UNTRACKED\0${path}\0`,"utf8")); hash.update(readFileSync(path)); } console.log(hash.digest("hex"));'
```

## Revision-2 source snapshot

- SHA-256: `4e863bc4e445848a5ca12c8a75ab6004d735d307af639ef8507521daacc383d8`.
- Tracked source bytes: the full output of `git diff --binary --no-ext-diff`
  against the base, with the preceding `TRACKED\0` byte sequence.
- Untracked source paths, sorted and framed individually by the command:
  - `.agent/plans/2026-08-26-governance-record-reconciliation.md`
  - `.agent/reports/automation-runs/2026-08-26-governance-lifecycle-reconciliation.md`
  - `.agent/reports/progress/2026-08-26-governance-lifecycle-reconciliation.md`
  - `.agent/tasks/TASK-011-governance-record-reconciliation.md`
- Excluded reviewer artifacts: `.agent/reviews/packets/TASK-011-input.md`,
  this self packet, and `.agent/reviews/REVIEW-TASK-011-001.md`.

## Full changed-file list (not the source snapshot set)

Tracked source paths:

- `.agent/acceptance/registry.yaml`
- `.agent/delivery-ledger.yaml`
- `.agent/memory/product.md`
- `.agent/tasks/TASK-001-code-reviewer-agent.md` through
  `.agent/tasks/TASK-010-product-first-planning.md`
- `CONVERSATION_MEMORY.md`

Untracked source paths:

- `.agent/plans/2026-08-26-governance-record-reconciliation.md`
- `.agent/reports/automation-runs/2026-08-26-governance-lifecycle-reconciliation.md`
- `.agent/reports/progress/2026-08-26-governance-lifecycle-reconciliation.md`
- `.agent/tasks/TASK-011-governance-record-reconciliation.md`

Reviewer artifacts outside the source snapshot:

- `.agent/reviews/packets/TASK-011-input.md` (historical input)
- `.agent/reviews/packets/TASK-011-002-input.md` (this packet)
- `.agent/reviews/REVIEW-TASK-011-001.md` (historical `changes-required`)

Compare this full list to `git status --short` before reviewing. A future
`REVIEW-TASK-011-002.md` is allowed by the task record but must not exist until
after the reviewer has independently reproduced the snapshot.

## Required verification

- The exact snapshot command was run twice from the worktree root after all
  source-document corrections. Both outputs were
  `4e863bc4e445848a5ca12c8a75ab6004d735d307af639ef8507521daacc383d8`.
- Run the exact snapshot command twice; both outputs must equal the recorded
  SHA-256 before a fresh review decision.
- `pnpm agent:validate` — exit 0: `Agent governance validation passed.`
- `pnpm agent:test` — exit 0: 32 passed, 0 failed.
- `git diff --check` — exit 0 with no output.
- Confirm TASK-011 and ledger remain `review`, and no commit/push occurred.

## Relevant evidence and review request

- Mapping: AC-GOV-01 → TASK-002/008/009; AC-GOV-02 → TASK-003–009;
  AC-GOV-03 → TASK-001/005/008/009/010, with only their exact final reports.
- TASK-003–009 remain tied only to consolidated `1704ed4` inclusion, not
  invented per-task ownership; TASK-010 records `4ee22c0` and its tracking
  branch.
- Implementer route: `gpt-5.6-terra` / high; no implementation escalation.

Perform a fresh independent, read-only `gpt-5.6-terra` / high review. Confirm
the P1 is resolved by reproducing the snapshot before any decision. Report
P0–P3 findings and an exact decision; do not commit, push, merge, deploy, or
modify files.
