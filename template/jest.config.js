"use strict";

module.exports = {
  clearMocks: true,
  testEnvironment: "node",
  <% if (typescript === true) { %>transform: {
    "^.+\\.ts$": "ts-jest",
  },<% } %>
};
