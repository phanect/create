"use strict";

export {
  clearMocks: true,
  testEnvironment: "node",
  <% if (lang === "typescript") { %>transform: {
    "^.+\\.ts$": "ts-jest",
  },<% } %>
};
