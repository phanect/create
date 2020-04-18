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
  },
};
