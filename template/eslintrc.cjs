"use strict";

const { join } = require("path");

module.exports = {
  root: true,
  extends: "phanective<%= env === 'node' ? '/node' : '' %>",

  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
    project: join(__dirname, "./tsconfig.json"),
  },
  overrides: [{
    files: [ "**/*.test.js", "**/*.test.cjs", "**/*.test.mjs" ],
    extends: "phanective/jest",
    parserOptions: {
      project: join(__dirname, "./test/tsconfig.json"),
    },
  }],
};
