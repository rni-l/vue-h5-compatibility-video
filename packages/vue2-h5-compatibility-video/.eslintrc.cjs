/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "@typescript-eslint/ban-types": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "vue/no-duplicate-attributes": 0,
    "vue/no-parsing-error": 0,
  },
};
