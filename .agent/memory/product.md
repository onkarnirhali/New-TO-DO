# Product Delivery Memory

- Product source: `docs/planning/07-master-delivery-plan.md`.
- Governance source: ledger, task/review records, and `.agent/governance/*`;
  repository/test evidence overrides stale prose.
- Routing (owner instruction 2026-08-26): Terra or Luna only. Terra/ultra is
  for planning, architecture, acceptance criteria, decomposition, and major
  decisions; Terra/high is required for all implementation and independent
  review; Luna/medium is limited to routine verification against documented
  guidelines and criteria and cannot approve work. `gpt-5.6-sol` is prohibited.
- Product baseline: API Dashboard/Task/Note source exists; checked-in web is a
  shell only. Clerk/OAuth/API client/Kanban/Notes workflow remain unimplemented;
  31 web launch blockers are unverified.
- Safety: preserve 25 dirty primary-checkout paths. Product work uses isolated
  worktrees only after governance approval.
- Governance reconciliation (2026-08-26): TASK-001 through TASK-010 and
  AC-GOV-01 through AC-GOV-03 are reconciled from exact approved review
  evidence; M0-GOVERNANCE is verified. TASK-011 remains pending independent
  review and is neither verified, committed, nor pushed.
- Next product task after the TASK-011 review gate: web test infrastructure.
  M1 still has 31 web launch-blocker criteria unverified. The dirty primary
  checkout remains preserved.
