#!/usr/bin/env node

"use strict";

const path = require("path");
const sao = require("sao");

(async () => {
  await sao({
    generator: path.resolve(__dirname, "../"),
    outDir: path.resolve(process.argv[2] || "."),
  }).run();
})();
