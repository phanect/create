"use strict";
<% if (typescript === true) { %>
const { join } = require("path");
<% } %>
module.exports = {
  root: true,
  extends: "plugin:@phanect/<%= (typescript === true) ? 'ts' : 'js' %>",

  env: {
    browser: true,
    node: true,
  },<% if (typescript === true) { %>
  parserOptions: {
    project: join(__dirname, "./tsconfig.json"),
  },<% } %>
  plugins: [ "@phanect" ],
};
