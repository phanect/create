"use strict";

const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    page1: "./js/index.js",
    page2: "./js/anotherpage.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    sideEffects: false,
    usedExports: true,
    // Do not make symbol names unreadable for performance analysis
    minimizer: [ new TerserPlugin({
      terserOptions: {
        compress: {
          keep_classnames: true,
          keep_fargs: true,
          keep_fnames: true,
        },
        mangle: {
          keep_classnames: true,
          keep_fnames: true,
        },
        keep_classnames: true,
        keep_fnames: true,
      },
    }) ],
  },
};
