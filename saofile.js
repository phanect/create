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
  ],
  async completed() {
    this.gitInit();

    const devDependencies = [
      "@phanect/eslint-config-phanective"
    ];

    await this.npmInstall();
    await this.npmInstall({
      packages: devDependencies,
      saveDev: true,
    });

    this.showProjectTips();
  },
};
