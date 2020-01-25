"use strict";

module.exports = {
  prompts() {
    return [
      {
        name: "name",
        message: "What is the name of the new project",
        default: this.outFolder,
        filter: val => val.toLowerCase(),
      },
      {
        name: "isPersonal",
        type: "confirm",
        message: "Is this a personal project? If this is company project, answer No.",
        default: true,
      },
      {
        name: "lib",
        type: "confirm",
        message: "Is this a library? If this is an app, answer No.",
        default: true,
      },
      {
        name: "typescript",
        type: "confirm",
        message: "Use TypeScript?",
        default: true,
      },
      {
        name: "env",
        type: "list",
        choices: [ "browser", "node" ],
        message: "Environment",
        default: true,
      },
    ];
  },
  actions: [
    {
      type: "add",
      files: "**",
      filters: {
        "test/main.test.js": "!typescript",
        "test/testutils.js": "!typescript",
        "tsconfig.json": "typescript",
        "test/main.test.ts": "typescript",
        "test/testutils.ts": "typescript",
        "test/tsconfig.json": "typescript",
        "webpack.common.js": "env === 'browser'",
        "webpack.dev.js": "env === 'browser'",
        "webpack.prod.js": "env === 'browser'",
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

    if (this.answers.typescript === true) {
      devDependencies = devDependencies.concat([
        "@types/jest",
        "ts-jest",
        "typescript",
      ]);
    }

    if (this.answers.typescript === true && this.answers.env === "node") {
      devDependencies.push("@types/node");
    }

    if (
      this.answers.typescript === true &&
      this.answers.env === "node" &&
      this.answers.lib === true
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
