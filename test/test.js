"use strict";

const { join } = require("path");
const test = require("ava");
const sao = require("sao");

const generator = join(__dirname, "..");

for (const owner of [ "personal", "company" ]) {
  for (const type of [ "lib", "app" ]) {
    for (const lang of [ "javascript", "typescript" ]) {
      for (const env of [ "browser", "node" ]) {
        test(
          `Generate files - ${owner} ${type} for ${env} written in ${lang}`,
          async t => {
            const stream = await sao.mock({ generator }, {
              name: "foo",
              owner,
              type,
              lang,
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
