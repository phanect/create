"use strict";

module.exports = {
  root: true,
  extends: "phanective/node",

  env: {
    node: true,
  },

  override: [{
    files: [ "**/*.js" ],
    parserOptions: {
      sourceType: "module",
    },
  }]
};
