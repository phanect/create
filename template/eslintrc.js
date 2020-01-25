"use strict";

module.exports = {
  root: true,
  extends: "plugin:@phanect/<%= (typescript === true) ? 'ts' : 'js' %>",

  env: {
    browser: true,
    node: true,
  },
  plugins: [ "@phanect" ],
};
