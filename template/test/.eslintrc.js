"use strict";
<% if (typescript === true) { %>
const { join } = require("path");
<% } %>
module.exports = {
  extends: [ "plugin:@phanect/jest" ],
  <% if (typescript === true) { %>
  parserOptions: {
    project: join(__dirname, "./tsconfig.json"),
  },<% } %>
}
