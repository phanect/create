"use strict";

const { join } = require("path");
const test = require("ava"); // eslint-disable-line node/no-missing-require, import/no-unresolved
const sao = require("sao");

const generator = join(__dirname, "..");

for (const owner of [ "personal", "company" ]) {
  for (const type of [ "lib", "app" ]) {
    for (const lang of [ "javascript", "typescript" ]) {
      for (const env of [ "browser", "node" ]) {
        for (const ci of [ "circleci", "github-actions" ]) {
          for (const license of [ "CC0-1.0", "MIT", "Apache-2.0", "UNLICENSED" ]) {
            test(
              `Generate files - ${owner} ${type} for ${env} written in ${lang}, using ${ci}, and licensed under ${license}`,
              async t => {
                const stream = await sao.mock({ generator }, {
                  name: "foo",
                  owner,
                  type,
                  lang,
                  env,
                  ci,
                  license,
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
  }
}
