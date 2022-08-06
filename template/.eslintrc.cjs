"use strict";
<% if (lang === "typescript") { %>
import { join } from "path";
<% } %>
module.exports = {
  root: true,
  extends: "phanective<%= env === 'node' ? '/node' : '' %>",

  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
<% if (lang === "typescript") { -%>
    project: join(__dirname, "./tsconfig.json"),
<% } -%>
  },
  overrides: [{
    files: [ "**/*.test.js", "**/*.test.cjs", "**/*.test.mjs" ],
    extends: "phanective/jest",
<% if (lang === "typescript") { -%>
    parserOptions: {
      project: join(__dirname, "./test/tsconfig.json"),
    },
<% } -%>
  }],
};
