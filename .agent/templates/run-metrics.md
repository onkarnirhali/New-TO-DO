# Agent OS Run Metrics

Use one record per three-hour controller run. Record measured minutes when
available; use `unknown` when a baseline did not capture a category. Never put
credentials, tokens, provider secrets, personal data, or raw external output in
this record.

## Run identity

- Run ID:
- Date (ISO-8601):
- Controller mode: dry-run | governed | production-use
- Author/model:
- Evidence scope:

## Time allocation (minutes)

| Category | Minutes | Evidence or note |
|---|---:|---|
| Planning | unknown | |
| Coding | unknown | |
| Testing | unknown | |
| Review | unknown | |
| Remediation | unknown | |
| Documentation | unknown | |
| Waiting | unknown | |

## Throughput and queue

- Tickets started:
- Tickets completed:
- Tickets reworked:
- Review queue depth at start:
- Review queue depth at end:
- Coding slots used / available:
- Verifier slots used / available:
- Reviewer slots used / available:

## Routing and escalation

- Model routes: `model / effort` plus the work type and ticket IDs.
- Escalations: `none` or prior route, new route, trigger, affected scope,
  owner decision, timestamp, and next action.

## Coding percentage

- Formula: `coding minutes / recorded wall-clock minutes × 100`.
- Observed coding percentage:
- Target range: **40–50%** of recorded wall-clock time.
- Target status: below | in range | above | not measurable

## Evidence and notes

- Commands and results:
- Frozen manifest/hash, if applicable:
- Main overheads or constraints:
- Next action:
