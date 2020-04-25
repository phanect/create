"use strict";

const { join } = require("path");
const test = require("ava");
const sao = require("sao");

const generator = join(__dirname, "..");

for (const isPersonal of [ true, false ]) {
  for (const lib of [ true, false ]) {
    for (const typescript of [ true, false ]) {
      for (const env of [ "browser", "node" ]) {
        test(
          `Generate files - ${isPersonal ? "personal" : "company"} ${lib ? "library" : "app"} for ${env} written in ${typescript ? "TypeScript" : "JavaScript"}`,
          async t => {
            const stream = await sao.mock({ generator }, {
              name: "foo",
              isPersonal,
              lib,
              typescript,
              env,
            });

            t.snapshot(stream.fileList, "Generated files");

            for (const file of stream.fileList) {
              t.snapshot(await stream.readFile(file), file);
            }
          }
        );
      }
    }
  }
}
