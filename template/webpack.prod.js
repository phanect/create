"use strict";

const merge = require("webpack-merge");

module.exports = merge(require("./webpack.common.js"), {
  mode: "production",
  optimization: {
    minimize: true, // true by default, but set explicitly
  },
});
