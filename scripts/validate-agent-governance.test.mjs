import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { validateGovernance } from "./validate-agent-governance.mjs";

const requiredFiles = [
  ".agent/governance/INVARIANTS.md",
  ".agent/governance/authority-matrix.md",
  ".agent/governance/documentation-policy.md",
  ".agent/governance/review-policy.md",
];

async function createGovernanceFixture({ omit } = {}) {
  const root = await mkdtemp(path.join(tmpdir(), "planote-governance-"));

  for (const relativePath of requiredFiles) {
    if (relativePath === omit) continue;
    const filePath = path.join(root, relativePath);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, "# Governance\n", "utf8");
  }

  return root;
}

test("rejects a missing required governance file", async (t) => {
  const root = await createGovernanceFixture({
    omit: ".agent/governance/INVARIANTS.md",
  });
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.rejects(
    () => validateGovernance({ root }),
    /Missing required governance file: \.agent\/governance\/INVARIANTS\.md/,
  );
});

test("accepts a complete governance file set", async (t) => {
  const root = await createGovernanceFixture();
  t.after(() => rm(root, { recursive: true, force: true }));

  await assert.doesNotReject(() => validateGovernance({ root }));
});

test("rejects a directory where a required governance file belongs", async (t) => {
  const relativePath = ".agent/governance/review-policy.md";
  const root = await createGovernanceFixture({ omit: relativePath });
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, relativePath), { recursive: true });

  await assert.rejects(
    () => validateGovernance({ root }),
    /Missing required governance file: \.agent\/governance\/review-policy\.md/,
  );
});
