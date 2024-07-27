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
        name: "lang",
        type: "list",
        choices: [ "javascript", "typescript" ],
        message: "Which language do you use?",
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
        "test/main.test.js": "lang === 'javascript'",
        "test/testutils.js": "lang === 'javascript'",
        "tsconfig.json": "lang === 'typescript'",
        "test/main.test.ts": "lang === 'typescript'",
        "test/testutils.ts": "lang === 'typescript'",
        "test/tsconfig.json": "lang === 'typescript'",
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
      "eslint",
      "eslint-config-phanective",
      "vitest",
    ];

    if (this.answers.lang === "typescript") {
      devDependencies = devDependencies.concat([
        "typescript",
      ]);
    }

    if (this.answers.lang === "typescript" && this.answers.env === "node") {
      devDependencies.push("@types/node");
      devDependencies.push("esno");
    }

    if (
      this.answers.lang === "typescript" &&
      this.answers.env === "node" &&
      this.answers.type === "lib"
    ) {
      devDependencies.push("esno");
    }

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
