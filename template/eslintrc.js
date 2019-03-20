"use strict";

module.exports = {
  extends: "plugin:@phanect/<%= (typescript === true) ? 'ts' : 'js' %>",

  env: {
    browser: true,
    node: true,
  },
  plugins: [ "@phanect" ],
};
