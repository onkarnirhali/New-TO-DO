# Escalation policy

The ticket records prior route, new route, reason, timestamp, and owner decision (when approval is required). Default routine coding and verification uses `gpt-5.6-luna / medium`; escalation uses `gpt-5.6-terra / high` for security, auth/authorization, provider access, database changes, cross-module integration, review, or reconciliation. Architecture/decomposition uses `gpt-5.6-terra / ultra`.

Escalate immediately for:

- security-sensitive code, credentials, permissions, auth, or authorization;
- database schema/migration/query changes or destructive-data risk;
- third-party provider, billing, deployment, or external side effects;
- cross-module integration or a conflict with another active scope;
- unexpected scope growth beyond the one stated outcome or file set;
- repeated test failure, repeated review findings, or evidence that the selected route is insufficient.

The escalation record must state: `from: model/effort`, `to: model/effort`, concrete reason, affected acceptance IDs/files, and whether owner approval is required. Stop at the boundary while awaiting a route decision. Escalation does not authorize forbidden actions, weaken acceptance criteria, or permit commit/push.
