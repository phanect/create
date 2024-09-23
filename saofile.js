"use strict";

module.exports = {
  prompts() {
    return [
      {
        name: "name",
        message: "What is the name of the new project?",
        default: this.outFolder,
        filter: val => val.toLowerCase(),
      },
      {
        name: "owner",
        type: "list",
        choices: [ "personal", "company" ],
        message: "Is this a personal or company project?",
      },
      {
        name: "license",
        type: "list",
        choices: [ "CC0-1.0", "MIT", "Apache-2.0", "UNLICENSED" ],
        message: "Which license do you apply?",
      },
      {
        name: "type",
        type: "list",
        choices: [ "lib", "app" ],
        message: "Is this a library or an app?",
      },
      {
        name: "env",
        type: "list",
        choices: [ "browser", "node" ],
        message: "Which environment do you use?",
        default: true,
      },
    ];
  },
  actions: [
    {
      type: "add",
      files: "**",
      filters: {
        "LICENSE-CC0": "license === 'CC0-1.0'",
        "LICENSE-MIT.ejs": "license === 'MIT'",
        "LICENSE-APACHE": "license === 'Apache-2.0'",
        "vite.config.ts": "env === 'browser'",
      },
    },
    {
      type: "move",
      patterns: {
        gitignore: ".gitignore",
        "LICENSE-*": "LICENSE",
      },
    },
    // Prevent ESLint to use template/.eslintrc.cjs as a real config for ESLint
    {
      type: "move",
      patterns: {
        "eslintrc.cjs": ".eslintrc.cjs",
      },
    },
  ],
  async completed() {
    this.gitInit();

    let devDependencies = [
      "@phanect/configs",
      "@phanect/lint",
      "@phanect/lint-vue",
      "@phanect/lint-svelte",
      "@phanect/lint-astro",
      "@types/node",
      "eslint",
      "esno",
      "vitest",
      "typescript",
    ];

    if (this.answers.env === "browser") {
      devDependencies.push(
        "vite",
      );
    } else {
      devDependencies.push("tsup");
    }

    await this.npmInstall({
      packages: devDependencies,
      saveDev: true,
    });

    this.showProjectTips();
  },
};
