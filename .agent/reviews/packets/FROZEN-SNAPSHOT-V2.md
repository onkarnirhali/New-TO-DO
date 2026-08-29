# Frozen Governance Bootstrap Snapshot V2

- Base HEAD: `e2cf113ac7e1507af32d680ff748095f69b352e6`
- Branch/worktree: `codex/governance-bootstrap` at
  `C:\Users\onkar\.agents\worktrees\New Todo\governance-bootstrap`
- Files: 37 implementation/documentation files; `.agent/reviews/**` excluded.
- Manifest SHA-256: `14aa86a94732e083e291150729ff6920be9570a910f54627d8392650bb3c45f2`
- Fresh checks: `pnpm agent:validate`; 23/23 `pnpm agent:test`; `pnpm lint`;
  `pnpm type-check`; `pnpm build`; and `git diff --check` passed. Root `pnpm
  test` exited 0 with zero configured package tasks. Lint retains 10 pre-existing
  web explicit-return-type warnings.

The manifest is SHA-256 over `BASE <sha>` followed by sorted
`<file-sha256>  <path>` rows for every non-review dirty path. Reviewers must
confirm that no implementation path changed after this record before deciding.

## Included scope

- `.agent/acceptance/**`, `.agent/automations/**`, `.agent/governance/**`,
  `.agent/memory/**`, `.agent/prompts/**`, `.agent/reports/**`,
  `.agent/skills/**`, `.agent/tasks/TASK-001` through `TASK-008`, and templates.
- `CONVERSATION_MEMORY.md`, `package.json`, `pnpm-lock.yaml`, and
  `scripts/validate-agent-governance.{mjs,test.mjs}`.

## Important environment evidence

Initial lint showed missing generated Prisma types in the isolated worktree.
`pnpm --filter @planote/api exec prisma generate --schema prisma/schema.prisma`
generated ignored `node_modules/.prisma/client`; the retry then passed without
source or lint-rule changes.

## Routing change

The active external automation is `gpt-5.6-terra`/high. Repository role prompts
allow Terra/Luna only; `pnpm agent:test` proves role prompts that route to the
retired planning model are rejected.
