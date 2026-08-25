# Planote Agent Control Files

This directory contains the repository-owned instructions and records used by the
Master Delivery Agent.

## Agent roles

- `prompts/code-reviewer-agent.md` defines the independent, read-only Code
  Reviewer Agent. The Master Delivery Agent must load it as the authoritative
  review contract and attach a documented, task-specific input packet when
  handing over a completed task.
- `templates/code-review.md` is the required evidence record for every review.

This is a bootstrap slice. Governance, acceptance registry, delivery ledger,
task templates, and validation tooling are defined in
`docs/superpowers/plans/2026-08-25-master-delivery-agent-implementation.md`
and must be added before the Master Delivery Agent leaves dry-run mode.
