# Frozen Governance Bootstrap Snapshot

- Base HEAD: `e2cf113ac7e1507af32d680ff748095f69b352e6`
- Worktree: `C:\Users\onkar\.agents\worktrees\New Todo\governance-bootstrap`
- Branch: `codex/governance-bootstrap`
- Files: 32 implementation/documentation files (review packets excluded)
- Manifest SHA-256: `7beb2266db44fdd2606d55e8c4c43097e6e0a392dceef9669e986eb7eb118131`
- Frozen after full local gates on: 2026-08-26

The fingerprint is SHA-256 over the UTF-8 lines `BASE <sha>` followed by sorted
`<file-sha256>  <path>` entries. Reviewers must confirm the worktree has not
changed outside `.agent/reviews/**` before deciding.

## File hashes

```text
25d7f7563a957a97e4b205969e9247ceebad89317a4520fab781a017d9907e65  .agent/acceptance/registry.yaml
887aafd45d5ca0c88136588e2a1bf98c6273185e59ac962d66078986c36b200e  .agent/acceptance/traceability.md
c0c0580b792e8528cf5f3a4845b0f8487cd4b9a809f95e2ac40d9535b4ac7666  .agent/automations/master-delivery-controller.json
1d894622cffb218aec2bd8dbc40a64555305dce6c641c325a90a5e1e4d6c3751  .agent/automations/master-delivery-controller.md
c54317b08ea40a15cd6bcb6079b91fd4641bb952a9799daf36de779be0cf5482  .agent/delivery-ledger.yaml
92b6411c516c1571b1f27c8547beb5fcc339a95b9ea5ea3bc5904a345ee3e57f  .agent/prompts/code-reviewer-agent.md
a66060425ac18b67faebca645921e3fdcaadc85036fd4035a3718aa9870e5440  .agent/prompts/implementation-agent.md
05d6de745eea6727c72665e5a982de8358a755dc42beebea28c2627f46012475  .agent/prompts/master-delivery-agent.md
35d8d4fe76d96cb663964692e06021586b0f21c3be57bc6dbdc178aa995cf4a2  .agent/prompts/security-reviewer-agent.md
01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b  .agent/reports/automation-runs/.gitkeep
01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b  .agent/skills/draft/.gitkeep
d3be6dfd9b7d2fd3cc8f28baec3eb793e774a378ccdd1ab42fc74baacd8295be  .agent/skills/promoted/acceptance-criteria-review.md
bee1cb0d5a7d057d52a24499a3077040ffe1419ff1c110d56d126c9e85645733  .agent/skills/promoted/code-review.md
65b8f1c99842ac44a11c5972bbc685743f28e406e0eda7d821f32adcbe299054  .agent/skills/promoted/release-verification.md
67a60563e57e41711586f562ad14e6d49685fafd938e02b951c700aeb3a6fc52  .agent/skills/promoted/task-delegation.md
74b4ebc61c0f6da19e5752c68f9e68ef3a691b6d5731ad727d0381f5ecb3a797  .agent/skills/SKILL_TEMPLATE.md
01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b  .agent/skills/validated/.gitkeep
7f96dce3d80e1a26bd0484a2b9c708908c1fa292d130fdab9b60c7780e79d0ca  .agent/tasks/TASK-001-code-reviewer-agent.md
c8960b78447b54359eecd92415304c18c1d21552052b4d3ccb91cc2417d053e1  .agent/tasks/TASK-002-governance-invariants.md
cfceeb68fac37e06c9a4c62ec69f681577dba21c24f3053c25a2688fd3cdd54d  .agent/tasks/TASK-003-acceptance-ledger.md
26e99c6120f4276d1561e6005ca89a09e55db60e69543dca9f36d4e99f0a5bd1  .agent/tasks/TASK-004-lifecycle-templates.md
e924e3c7c96414f7e3825908d84f561b3120c6446702620b1753b827514daf75  .agent/tasks/TASK-005-role-prompts.md
35f2ed19adb8d1f576f598857b83085c1b1a5ccf36c1fdd587674f3f1cd6ecfe  .agent/tasks/TASK-006-skill-lifecycle.md
3d1cd3db4eb3dc8b17024ee97b53d154704b4008acfab85ba3bd31e20c667bf2  .agent/tasks/TASK-007-automation-configuration.md
4bdb9ab1d7cc6d60207d81d33163d99bc9d3a1495b8d6e7fc961f40029b41f11  .agent/templates/adr.md
b65d3b1719eef201228df3a3d8ba7efe88ee82dff99633b6ddac68fcbbbd58be  .agent/templates/agent-handoff.md
815169c2c276149a6a96e455997d731fcc3b5aea2d0e9aea5b72dee82315c2df  .agent/templates/progress-report.md
a5ea9d98d81f08130a22a3c69d9e23d1d002fd0ea97e9b5adcd24a7fb7af242f  .agent/templates/task.md
8986bc9acacb612c747fe6ddfe405ccbe402872bed9359ba156bdcb4af07c6fa  package.json
ed5d016e3d641bd087919dd365873fa0d4ee220f000be655eeeabe522d7e0ce5  pnpm-lock.yaml
8bffc956349ca0599f1630d738d142dd510869e8b9c35a076d18fa3ba56e2ab5  scripts/validate-agent-governance.mjs
9b8b657c856434c7309722f6598c50147e82606ed2cf297aa78317868fb8389c  scripts/validate-agent-governance.test.mjs
```

## Fresh verification evidence

- `pnpm agent:validate`: passed.
- `pnpm agent:test`: 23 passed, 0 failed.
- `pnpm lint`: passed; 10 pre-existing web explicit-return-type warnings.
- `pnpm type-check`: passed.
- `pnpm test`: exit 0, but zero package test tasks were configured/executed.
- `pnpm build`: API and web production builds passed.
- `git diff --check`: passed.
- Environment prerequisite: Prisma Client was generated in ignored
  `node_modules/.prisma/client` after the initial lint exposed its absence.
- Routing update: the active automation and repository prompts now use Terra or
  Luna only; Sol routing is rejected by the validator.
