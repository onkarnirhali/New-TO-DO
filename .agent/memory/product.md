# Product Delivery Memory

- Product source: `docs/planning/07-master-delivery-plan.md`.
- Governance source: ledger, task/review records, and `.agent/governance/*`;
  repository/test evidence overrides stale prose.
- Routing (owner instruction 2026-08-26): Terra or Luna only. Luna/medium may
  implement bounded routine low-risk coding and perform routine verification;
  Terra/high is required for authentication, authorization, database, provider,
  security, cross-module integration, independent review, and final
  reconciliation; Terra/ultra is for planning, architecture, acceptance
  criteria, decomposition, and major decisions. Luna cannot approve work or
  make delivery decisions. Record the selected route and rationale plus every
  escalation (prior route, new route, reason, affected scope, and owner decision
  when required). `gpt-5.6-sol` is prohibited.
- Product baseline: API Dashboard/Task/Note source exists; checked-in web is a
  shell only. Clerk/OAuth/API client/Kanban/Notes workflow remain unimplemented;
  31 web launch blockers are unverified.
- Safety: preserve 25 dirty primary-checkout paths. Product work uses isolated
  worktrees only after governance approval.
- Blocker: independent Terra reviewer capacity was unavailable; no task may be
  verified, committed, or pushed until it returns.
