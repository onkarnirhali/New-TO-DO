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
- Blocker: independent Terra reviewer capacity was unavailable; no task may be
  verified, committed, or pushed until it returns.
