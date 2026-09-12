import { fileURLToPath } from "node:url";
// TODO Remove imports you don't use
import { core, nodejs, unbundled } from "@phanect/lint";
import { react, nextjs } from "@phanect/lint-react";
import { svelte } from "@phanect/lint-svelte";
import { astro } from "@phanect/lint-astro";
import { defineConfig, globalIgnores, includeIgnoreFile } from "eslint/config";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

const configs = defineConfig([
  includeIgnoreFile(gitignorePath),
  globalIgnores([
    "./**/dist/**",
  ]),

  ...core,
  // TODO Add if you need
  // ...nodejs,
  // ...unbundled,
  // ...react,
  // ...nextjs,
  // ...svelte,
  // ...astro,

  {
    // Do not add `files: [ "*" ],` here.

    languageOptions: {
      parserOptions: {
        projectService: true,
        // TODO Use `project: true` instead if you use `astro` ruleset.
        // project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);

export default configs;
