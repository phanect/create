/// <reference types="vitest" />
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const packageJson = JSON.parse((await readFile(join(import.meta.dirname, "package.json"))).toString());
const deps = Object.keys(packageJson.dependencies ?? {});

export default defineConfig({
  // ▼▼ TODO Add this section if the project is an npm package ▼▼
  build: {
    lib: {
      entry: join(import.meta.dirname, "src/main.ts"),
      name: "main",
      fileName: "main",
      formats: [ "es", "cjs" ],
    },
    rollupOptions: {
      external: deps,
    },
  },
  plugins: [
    dts({
      outDir: join(import.meta.dirname, "dist/types"),
      entryRoot: join(import.meta.dirname, "src"),
      rollupTypes: true, // Generate single d.ts file
    }),
  ],
  // ▲▲ TODO Add this section if the project is an npm package ▲▲

  // ▼▼ TODO Add this section if the project is an app ▼▼
  server: {
    port: 3000,
  },
  // ▲▲ TODO Add this section if the project is an app ▲▲

  test: {}, // TODO Remove this line if you don't use Vitest in the project
});
