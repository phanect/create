#!/usr/bin/env node

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { loadConfig } from "@scaffdog/config";
import { createScaffdog } from "scaffdog";
import { join } from "node:path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const descriptor = loadConfig(join(__dirname, "../.scaffdog"));
const scaffdog = createScaffdog(descriptor);

for (const doc of await scaffdog.list()) {
  const files = await scaffdog.generate(doc, join(__dirname, "../dist"), {
    inputs: async (context) => {
      return {
        name: 'FooComponent',
      };
    },
  });

  for (const file of files) {
    if (file.skip) {
      continue;
    }
    console.log(file.path, ":\n", file.content, "\n\n----------\n\n")
    //await writeFile(file.path, file.content);
  }
}
