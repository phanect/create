"use strict";
<% if (lang === "typescript") { %>
import { join } from "path";
<% } %>
module.exports = {
  extends: [ "plugin:@phanect/jest" ],
  <% if (lang === "typescript") { %>
  parserOptions: {
    project: join(__dirname, "./tsconfig.json"),
  },<% } %>
}
