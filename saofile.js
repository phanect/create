const superb = require("superb");

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
        name: "description",
        message: "How would you describe the new project",
        default: `my ${superb()} project`,
      },
      {
        name: "typescript",
        type: "confirm",
        message: "Use TypeScript?",
        default: true,
      },
    ];
  },
  actions: [
    {
      type: "add",
      files: "**",
    },
    {
      type: "move",
      patterns: {
        gitignore: ".gitignore",
      },
    },
    {
      type: "remove",
      files: "tsconfig.json",
      when: "!typescript",
    },
  ],
  async completed() {
    this.gitInit();

    const devDependencies = [
      "@phanect/eslint-config-phanective"
    ];

    if (this.answers.typescript === true) {
      devDependencies.push("typescript");
    }

    await this.npmInstall();
    await this.npmInstall({
      packages: devDependencies,
      saveDev: true,
    });

    this.showProjectTips();
  },
};
