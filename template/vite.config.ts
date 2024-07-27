/// <reference types="vitest" />
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const packageJson = JSON.parse((await readFile(join(__dirname, "package.json"))).toString());
const deps = Object.keys(packageJson.dependencies ?? {});

export default defineConfig({
<% if (type === "lib") { -%>
  build: {
    lib: {
      entry: join(__dirname, "src/main.ts"),
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
      outDir: join(__dirname, "dist/types"),
      entryRoot: join(__dirname, "src"),
      rollupTypes: true, // Generate single d.ts file
    }),
  ],
<% } else if (type === "app") { -%>
  server: {
    port: 3000,
  },
<% } -%>
  test: {},
});
