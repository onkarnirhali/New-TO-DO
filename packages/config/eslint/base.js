/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    // Catch unused variables — common source of dead code
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

    // Force explicit return types on exported functions — self-documenting
    "@typescript-eslint/explicit-module-boundary-types": "warn",

    // Never use `any` — defeats the purpose of TypeScript
    "@typescript-eslint/no-explicit-any": "error",

    // Consistent type imports — `import type` for types only
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
  },
};
