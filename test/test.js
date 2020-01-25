"use strict";

const { join } = require("path");
const test = require("ava");
const sao = require("sao");

const generator = join(__dirname, "..");
const conditions = [
  {
    name: "foo",
    isPersonal: true,
    lib: true,
    typescript: true,
    env: "browser",
  },
  {
    name: "foo",
    isPersonal: true,
    lib: true,
    typescript: true,
    env: "node",
  },
  {
    name: "foo",
    isPersonal: true,
    lib: true,
    typescript: false,
    env: "browser",
  },
  {
    name: "foo",
    isPersonal: true,
    lib: true,
    typescript: false,
    env: "node",
  },
  {
    name: "foo",
    isPersonal: true,
    lib: false,
    typescript: true,
    env: "browser",
  },
  {
    name: "foo",
    isPersonal: true,
    lib: false,
    typescript: true,
    env: "node",
  },
  {
    name: "foo",
    isPersonal: true,
    lib: false,
    typescript: false,
    env: "browser",
  },
  {
    name: "foo",
    isPersonal: true,
    lib: false,
    typescript: false,
    env: "node",
  },
  {
    name: "foo",
    isPersonal: false,
    lib: true,
    typescript: true,
    env: "browser",
  },
  {
    name: "foo",
    isPersonal: false,
    lib: true,
    typescript: true,
    env: "node",
  },
  {
    name: "foo",
    isPersonal: false,
    lib: true,
    typescript: false,
    env: "browser",
  },
  {
    name: "foo",
    isPersonal: false,
    lib: true,
    typescript: false,
    env: "node",
  },
  {
    name: "foo",
    isPersonal: false,
    lib: false,
    typescript: true,
    env: "browser",
  },
  {
    name: "foo",
    isPersonal: false,
    lib: false,
    typescript: true,
    env: "node",
  },
  {
    name: "foo",
    isPersonal: false,
    lib: false,
    typescript: false,
    env: "browser",
  },
  {
    name: "foo",
    isPersonal: false,
    lib: false,
    typescript: false,
    env: "node",
  },
];

for (const [ i, condition ] of Object.entries(conditions)) {
  test(`Generate files - ${i}`, async t => {
    const stream = await sao.mock({ generator }, condition);

    t.snapshot(stream.fileList, "Generated files");

    for (const file of stream.fileList) {
      t.snapshot(await stream.readFile(file), file);
    }
  });
}
