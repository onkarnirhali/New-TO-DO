/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "./base.js",
    "next/core-web-vitals",
  ],
  rules: {
    // Next.js App Router uses async Server Components — allow await at top level
    "@typescript-eslint/require-await": "off",
  },
};
