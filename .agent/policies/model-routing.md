# Planote Model Routing Policy

This policy is the source of truth for selecting a model and reasoning effort
for each governed task. The task packet must record the selected route,
complexity rationale, and escalation history. A route change requires a
recorded prior route, new route, reason, and owner decision when the boundary is
material.

| Work type | Required route | Boundary |
| --- | --- | --- |
| Routine coding with no sensitive or cross-module boundary | `gpt-5.6-luna` / medium | Luna may implement only the bounded routine scope. |
| Routine documented verification | `gpt-5.6-luna` / medium | Luna records command evidence; it cannot approve or make delivery decisions. |
| Authentication or authorization | `gpt-5.6-terra` / high | Escalate before implementation or interpretation crosses this boundary. |
| Database, migration, provider access, or security | `gpt-5.6-terra` / high | Include threat, rollback, and external-authority rationale where relevant. |
| Cross-module integration, independent review, or controller reconciliation | `gpt-5.6-terra` / high | Review must be fresh and independent; reconciliation must remain governed. |
| Architecture, decomposition, acceptance design, or major technical decision | `gpt-5.6-terra` / ultra | Use for planning/design decisions, not as a shortcut around review. |

## Escalation rule

When a task crosses a boundary, pause the lower-route work, record the prior
route, new route, exact trigger, reason, affected scope, and owner decision if
required, then continue only on the higher route. If the route cannot be
selected safely, return `blocked`. Never silently continue, downgrade the
model, or treat a Luna verification result as approval.

## Delivery controls

Routing does not change authority. Implementers and verifiers cannot approve;
reviewers are read-only; only an exact independent `approved` review with all
gates green permits the Master to consider a focused commit/push. Owner approval
remains required for protected-branch merges, deployment, publication,
credentials, providers, billing, destructive live-data work, and governance or
acceptance changes.
