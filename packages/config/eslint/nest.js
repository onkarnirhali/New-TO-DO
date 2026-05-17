/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["./base.js"],
  rules: {
    // NestJS uses decorators heavily — allow them without strict TS checking
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
