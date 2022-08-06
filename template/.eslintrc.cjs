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
};
