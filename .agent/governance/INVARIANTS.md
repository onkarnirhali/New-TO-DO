# Delivery Governance Invariants

These owner-controlled rules apply to every agent and task.

1. Document every agent prompt, action, assumption, decision, result, blocker,
   and handoff.
2. Do not mark a task complete without repository and verification evidence.
3. An implementer cannot approve its own work.
4. P0 and P1 review findings block completion.
5. Never log, commit, or copy secrets, passwords, tokens, credentials, or
   private keys into agent records.
6. Every changed file must map to an approved task or documented necessary
   dependency.
7. Do not autonomously change protected governance files.
8. Production and other external irreversible actions require owner approval.
9. Reviewer approval never authorises a protected-branch merge or deployment.
10. A task without required documentation is `unverified`, never `done`.
