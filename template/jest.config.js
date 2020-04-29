"use strict";

module.exports = {
  clearMocks: true,
  testEnvironment: "node",
  <% if (lang === "typescript") { %>transform: {
    "^.+\\.ts$": "ts-jest",
  },<% } %>
};
