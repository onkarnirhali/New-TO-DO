# Frozen Governance Bootstrap Snapshot V3

- Base HEAD: `e2cf113ac7e1507af32d680ff748095f69b352e6`
- Branch/worktree: `codex/governance-bootstrap` at
  `C:\Users\onkar\.agents\worktrees\New Todo\governance-bootstrap`
- Files: 37 non-review implementation/documentation paths dirty relative to the
  base; `.agent/reviews/**` is explicitly excluded.
- Manifest SHA-256: `34369c67f1b68f864acd52290311fe4eb8949e424fdf58eede03b9b561f923da`

The manifest is SHA-256 over the UTF-8 byte sequence of `BASE <sha>` followed
by a line feed, then the sorted `<file-sha256>  <path>` rows below, each
terminated with a line feed. The scope is the complete current set of
non-review dirty paths relative to Base HEAD; existing `FROZEN-SNAPSHOT.md` and
`FROZEN-SNAPSHOT-V2.md` are retained as historical records. Reviewers must
recompute this manifest and confirm no non-review implementation path changed
before deciding.

## File hashes

```text
25d7f7563a957a97e4b205969e9247ceebad89317a4520fab781a017d9907e65  .agent/acceptance/registry.yaml
887aafd45d5ca0c88136588e2a1bf98c6273185e59ac962d66078986c36b200e  .agent/acceptance/traceability.md
c0c0580b792e8528cf5f3a4845b0f8487cd4b9a809f95e2ac40d9535b4ac7666  .agent/automations/master-delivery-controller.json
1d894622cffb218aec2bd8dbc40a64555305dce6c641c325a90a5e1e4d6c3751  .agent/automations/master-delivery-controller.md
73bb2f77bf9e5a9ac25ad8fde40ef212feef9eaa33e5fe827c373860a3b47403  .agent/delivery-ledger.yaml
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
7f96dce3d80e1a26bd0484a2b9c708908c1fa292d130fdab9b60c7780e79d0ca  .agent/tasks/TASK-001-code-reviewer-agent.md
c8960b78447b54359eecd92415304c18c1d21552052b4d3ccb91cc2417d053e1  .agent/tasks/TASK-002-governance-invariants.md
cfceeb68fac37e06c9a4c62ec69f681577dba21c24f3053c25a2688fd3cdd54d  .agent/tasks/TASK-003-acceptance-ledger.md
26e99c6120f4276d1561e6005ca89a09e55db60e69543dca9f36d4e99f0a5bd1  .agent/tasks/TASK-004-lifecycle-templates.md
403e1405515f2a842b65bae1baba39a304210e65271380d3a743c1fc1b56bcf5  .agent/tasks/TASK-005-role-prompts.md
35f2ed19adb8d1f576f598857b83085c1b1a5ccf36c1fdd587674f3f1cd6ecfe  .agent/tasks/TASK-006-skill-lifecycle.md
3d1cd3db4eb3dc8b17024ee97b53d154704b4008acfab85ba3bd31e20c667bf2  .agent/tasks/TASK-007-automation-configuration.md
86550800cd9133377e19eef92df399d6831e7fe9c5999d98bf70a828c26535ac  .agent/tasks/TASK-008-governance-bootstrap.md
4bdb9ab1d7cc6d60207d81d33163d99bc9d3a1495b8d6e7fc961f40029b41f11  .agent/templates/adr.md
b65d3b1719eef201228df3a3d8ba7efe88ee82dff99633b6ddac68fcbbbd58be  .agent/templates/agent-handoff.md
815169c2c276149a6a96e455997d731fcc3b5aea2d0e9aea5b72dee82315c2df  .agent/templates/progress-report.md
a5ea9d98d81f08130a22a3c69d9e23d1d002fd0ea97e9b5adcd24a7fb7af242f  .agent/templates/task.md
87b3a44275e2da6541da99433112916a5320289599437d10fe838948a3df1075  CONVERSATION_MEMORY.md
8986bc9acacb612c747fe6ddfe405ccbe402872bed9359ba156bdcb4af07c6fa  package.json
ed5d016e3d641bd087919dd365873fa0d4ee220f000be655eeeabe522d7e0ce5  pnpm-lock.yaml
f2f83303e740ca14fb66cefb1a271f6720b3f94fc42d655cac64c81e8eb31c7d  scripts/validate-agent-governance.mjs
71a7e36866f698958cef4e0bdae4123ff7305793afa4a1fe87dbb13d2dad15ab  scripts/validate-agent-governance.test.mjs
```

## Fresh gate evidence

- `pnpm agent:validate` — exit 0: `Agent governance validation passed.`
- `pnpm agent:test` — exit 0: 24 tests passed, 0 failed, 0 skipped; duration
  1620.931 ms.
- `pnpm lint` — exit 0: 2/2 Turbo lint tasks successful. It reports 10
  pre-existing `@typescript-eslint/explicit-module-boundary-types` warnings in
  the web package.
- `pnpm type-check` — exit 0: 2/2 Turbo type-check tasks successful.
- `pnpm test` — exit 0: Turbo explicitly reported `No tasks were executed as
  part of this run` (0 successful, 0 total).
- `pnpm build` — exit 0: API and web build tasks successful. The web build
  repeats the same 10 pre-existing return-type warnings.
- `git diff --check` — exit 0 after the TASK-008 evidence refresh and before
  this snapshot.

## Reviewer context and known provenance

- The V2 packet was stale: it cited 23/23 governance tests and predated later
  changes to repository memory, all four role prompts, promoted skills,
  TASK-005, TASK-008, and the validator and its tests.
- TASK-001's historical task record names `AC-GOV-REVIEW-01`, while the current
  delivery ledger maps TASK-001 to `AC-GOV-03`. This is disclosed rather than
  rewritten.
- TASK-002 records an earlier Luna/medium implementation route, while the
  current role contracts require Terra/high implementation. TASK-003, TASK-004,
  TASK-006, and TASK-007 retain historical generic Codex model/effort records;
  TASK-005 records a prior Terra/high then Terra/ultra planning-route update.
  These are historical provenance discrepancies, not a claim of retroactive
  conformance.
- Three earlier independent-review attempts were blocked by account quota. No
  task is approved, verified, committed, pushed, merged, or deployed by this
  handoff.
