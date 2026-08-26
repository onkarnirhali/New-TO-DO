import { stat } from "node:fs/promises";
import path from "node:path";

export const REQUIRED_GOVERNANCE_FILES = [
  ".agent/governance/INVARIANTS.md",
  ".agent/governance/authority-matrix.md",
  ".agent/governance/documentation-policy.md",
  ".agent/governance/review-policy.md",
];

export async function validateGovernance({ root }) {
  for (const relativePath of REQUIRED_GOVERNANCE_FILES) {
    try {
      const file = await stat(path.join(root, relativePath));
      if (!file.isFile()) throw new Error("Required path is not a file");
    } catch {
      throw new Error(`Missing required governance file: ${relativePath}`);
    }
  }
}
