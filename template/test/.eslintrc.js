"use strict";
<% if (lang === "typescript") { %>
const { join } = require("path");
<% } %>
module.exports = {
  extends: [ "plugin:@phanect/jest" ],
  <% if (lang === "typescript") { %>
  parserOptions: {
    project: join(__dirname, "./tsconfig.json"),
  },<% } %>
}
