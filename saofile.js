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
        "test/main.test.js": "lang === 'javascript'",
        "test/testutils.js": "lang === 'javascript'",
        "tsconfig.json": "lang === 'typescript'",
        "test/main.test.ts": "lang === 'typescript'",
        "test/testutils.ts": "lang === 'typescript'",
        "test/tsconfig.json": "lang === 'typescript'",
        "webpack.config.js": "env === 'browser'",
      },
    },
    {
      type: "move",
      patterns: {
        gitignore: ".gitignore",
      },
    },
    // Not ESLint to use the template file as real .eslintrc.* file
    {
      type: "move",
      patterns: {
        "eslintrc.js": ".eslintrc.js",
      },
    },
  ],
  async completed() {
    this.gitInit();

    let devDependencies = [
      "@phanect/eslint-plugin",
      "jest",
    ];

    if (this.answers.lang === "typescript") {
      devDependencies = devDependencies.concat([
        "@types/jest",
        "ts-jest",
        "typescript",
      ]);
    }

    if (this.answers.lang === "typescript" && this.answers.env === "node") {
      devDependencies.push("@types/node");
    }

    if (
      this.answers.lang === "typescript" &&
      this.answers.env === "node" &&
      this.answers.type === "lib"
    ) {
      devDependencies.push("ts-node");
    }

    if (this.answers.env === "browser") {
      devDependencies.push(
        "webpack",
        "webpack-dev-server",
      );
    }

    await this.npmInstall({
      packages: devDependencies,
      saveDev: true,
    });

    this.showProjectTips();
  },
};
