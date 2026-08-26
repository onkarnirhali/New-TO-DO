# Acceptance Traceability

The registry at `.agent/acceptance/registry.yaml` is authoritative for stable
acceptance IDs and status. Source and test evidence may advance a criterion to
`implemented`; only complete verification evidence plus independent approval
may advance it to `verified`.

## Baseline summary

| Scope | Criteria | Current disposition |
|---|---:|---|
| Governance | 3 | Bootstrap active; policies and reviewer contract implemented |
| Web launch blockers | 31 | 0 verified; all remain delivery work |
| Pre-launch operations | 5 | 0 verified |
| Later mobile, billing, AI, settings, collaboration, extension | 11 | Deferred by approved plan |

Partial backend or shell source is recorded in each criterion's
`implementationNotes`; it is not treated as criterion completion when the full
API, web, provider, accessibility, or independent-review evidence is absent.

## Source mapping

- Authentication and account: `apps/api/src/auth/`, `apps/api/src/users/`,
  `apps/web/src/app/`.
- Dashboards and Kanban: `apps/api/src/dashboards/`, `apps/web/src/app/app/`.
- Tasks and reminders: `apps/api/src/tasks/`.
- Notes: `apps/api/src/notes/`.
- Product criteria: `docs/planning/07-master-delivery-plan.md`.

Task records must list their acceptance IDs, and review records must repeat the
same IDs with file and command evidence.
