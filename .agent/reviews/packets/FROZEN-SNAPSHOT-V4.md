# Frozen Governance Bootstrap Snapshot V4

- Base HEAD: `e2cf113ac7e1507af32d680ff748095f69b352e6`
- Branch/worktree: `codex/governance-bootstrap` at
  `C:\Users\onkar\.agents\worktrees\New Todo\governance-bootstrap`
- Files: 38 non-review implementation/documentation paths dirty relative to
  the base; `.agent/reviews/**` is explicitly excluded.
- Manifest SHA-256: `4c29767f960bb863686a8eff6703b8e86fc0b4368e497bbb4b1dc44f1f2ef77f`

The manifest is SHA-256 over the UTF-8 byte sequence of `BASE <sha>` followed
by a line feed, then the sorted `<file-sha256>  <path>` rows below, each
terminated with a line feed. Its scope is the complete current set of dirty
non-review paths relative to Base HEAD. V1–V3 remain historical artifacts.

## File hashes

```text
25d7f7563a957a97e4b205969e9247ceebad89317a4520fab781a017d9907e65  .agent/acceptance/registry.yaml
887aafd45d5ca0c88136588e2a1bf98c6273185e59ac962d66078986c36b200e  .agent/acceptance/traceability.md
c0c0580b792e8528cf5f3a4845b0f8487cd4b9a809f95e2ac40d9535b4ac7666  .agent/automations/master-delivery-controller.json
1d894622cffb218aec2bd8dbc40a64555305dce6c641c325a90a5e1e4d6c3751  .agent/automations/master-delivery-controller.md
7f063ee8afff136737a96fa68e34ba658504d2a3c9e48a9ee1c9741ed593998c  .agent/delivery-ledger.yaml
ad64f86d48891b03a73ce4009a16b79df9f1f133cf4613b6351d094f10b69d39  .agent/memory/product.md
6f494683fd5a7e85a02aa0dcb71512be791f446e945b35207c68834840ec7ab0  .agent/prompts/code-reviewer-agent.md
3c04569aa485ab3b0c3d3541f1d593baae6e555bce7e82c01aec36fc3ded9c74  .agent/prompts/implementation-agent.md
e282405946769c7eaa38639aa4d37962849591e7500a48ee665c5a573cca7edd  .agent/prompts/master-delivery-agent.md
671d894c7096088aa027b007ce3aa7d54937954c54d37abcbce9cab81c2ef081  .agent/prompts/security-reviewer-agent.md
01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b  .agent/reports/automation-runs/.gitkeep
f23d0d8c1fced90b511bc5e4fc489ed92962ca1939eebc2e93d48895b236eff4  .agent/reports/automation-runs/2026-08-26-dry-run.md
60df7beb311b37a7b99b7d8cf2ac98bd8aca9ff36977ec2094a9eaf5bd6ad45f  .agent/reports/progress/2026-08-26-governance-bootstrap-baseline.md
01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b  .agent/skills/draft/.gitkeep
d3be6dfd9b7d2fd3cc8f28baec3eb793e774a378ccdd1ab42fc74baacd8295be  .agent/skills/promoted/acceptance-criteria-review.md
0b5e6a495b260beb9d06c0c73eb74b7a375bdd280664b0a6982db38c661ec052  .agent/skills/promoted/code-review.md
e46e2dd7e0a4f2484752b3b62bb802c4ffd40f452c065de13d9aaaf42a0a0871  .agent/skills/promoted/release-verification.md
89477a3f36f20a10526617dd5fc4dafcda581f1b89e1f59e0bcc652f8721d62e  .agent/skills/promoted/task-delegation.md
74b4ebc61c0f6da19e5752c68f9e68ef3a691b6d5731ad727d0381f5ecb3a797  .agent/skills/SKILL_TEMPLATE.md
01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b  .agent/skills/validated/.gitkeep
63a5414f55ba0cce5618e71bcfbc3a8efd73e539d96881edcd37ebb0d9326017  .agent/tasks/TASK-001-code-reviewer-agent.md
0bb6b792ad1db6d06c835d56de942b1495672fa4593a9e79024eca9fd6b71f48  .agent/tasks/TASK-002-governance-invariants.md
94c533b016aff75c38ccfde16bb02f566fa55b55db2b7c7b1d04c9f00a93ffc0  .agent/tasks/TASK-003-acceptance-ledger.md
1d5064114d34fa6c353154e9ff39c9bfb30ac47a077441c9c6fb39c71b55d016  .agent/tasks/TASK-004-lifecycle-templates.md
acf04d84c6dd0814c400a9e47bdd8b403ad2a1c127b68742cdfc16e8f2d963b4  .agent/tasks/TASK-005-role-prompts.md
d665cbdb49c0bdcb7d4935071ce48672e749e03fb74fafc6544b204f0d19b446  .agent/tasks/TASK-006-skill-lifecycle.md
5d9c4a7288251c47cf8cd6235c73b96a8aba0d095c69ec155ddd0847031cbf76  .agent/tasks/TASK-007-automation-configuration.md
3e7765cc296f407b8c9430a8f312526ca3939190dc9b312aecf4792f5d21b7eb  .agent/tasks/TASK-008-governance-bootstrap.md
54f7ba7adeaf0d22637e8e0372633addc34e8eba7fb00b0676cd90d4126658fc  .agent/tasks/TASK-009-lifecycle-traceability.md
4bdb9ab1d7cc6d60207d81d33163d99bc9d3a1495b8d6e7fc961f40029b41f11  .agent/templates/adr.md
b65d3b1719eef201228df3a3d8ba7efe88ee82dff99633b6ddac68fcbbbd58be  .agent/templates/agent-handoff.md
815169c2c276149a6a96e455997d731fcc3b5aea2d0e9aea5b72dee82315c2df  .agent/templates/progress-report.md
a5ea9d98d81f08130a22a3c69d9e23d1d002fd0ea97e9b5adcd24a7fb7af242f  .agent/templates/task.md
6dbda62b0d5aaea1082b4681d8ab30f027be17b7fa52d64a78b6beb1a365b2dc  CONVERSATION_MEMORY.md
8986bc9acacb612c747fe6ddfe405ccbe402872bed9359ba156bdcb4af07c6fa  package.json
ed5d016e3d641bd087919dd365873fa0d4ee220f000be655eeeabe522d7e0ce5  pnpm-lock.yaml
6d8d94766048ded42df9e8b20792abc49b81a27d566747c9c5dc204c2511b134  scripts/validate-agent-governance.mjs
a0e475b039a056aaf0aa58d4f40f84a08d18521947c01b2cc69474bf15d0b848  scripts/validate-agent-governance.test.mjs
```

## Fresh gate evidence

- `pnpm agent:validate` — exit 0: `Agent governance validation passed.`
- `pnpm agent:test` — exit 0: 29 passed, 0 failed, 0 skipped.
- `pnpm lint` — exit 0: 2/2 tasks successful; 10 pre-existing web
  explicit-return-type warnings remain.
- `pnpm type-check` — exit 0: 2/2 tasks successful.
- `pnpm test` — exit 0: Turbo reported no configured test tasks (0 total).
- `pnpm build` — exit 0: API and web build tasks successful; the same 10
  existing web warnings were emitted.
- `git diff --check` — exit 0.

## Reviewer handoff boundaries

V4 is an implementation handoff only. It does not approve, verify, commit,
push, merge, deploy, alter credentials, or change external configuration. Each
TASK-001–TASK-009 packet requests a fresh independent task-level decision.
