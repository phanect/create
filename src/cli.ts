import { existsSync as exists, lstatSync as lstat } from "node:fs";
import { cp, mkdir, readdir } from "node:fs/promises";
import { basename, join, relative } from "node:path";
import { argv, cwd } from "node:process";
import { fileURLToPath } from "node:url";
import input from "@inquirer/input";
import select from "@inquirer/select";
import { isDirEmpty, lastElementOf } from "./utils.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const templateDir = join(__dirname, "../template");
const currentDir = cwd();
const dirEmpty = await isDirEmpty(currentDir);

const answers = {
  prjName: await input({
    message: "What is the name of the new project?",
    default: (
      argv[2]
        ?.replaceAll(".", "")
        .replaceAll("/", "")
        .replaceAll("\\", "") ??
      dirEmpty ? basename(currentDir) : "new-prj"
    ).toLowerCase(),
  }),
  ownerType: await select<"personal" | "company">({
    message: "Is this a personal or company project?",
    choices: [
      {
        name: "Personal",
        value: "personal",
      },
      {
        name: "Company",
        value: "company",
      },
    ],
  }),
  license: await select<"Apache-2.0" | "MIT" | "CC0-1.0" | "UNLICENSED">({
    message: "Which license do you apply?",
    choices: [
      {
        name: "Apache License 2.0",
        value: "Apache-2.0",
      },
      {
        name: "MIT License",
        value: "MIT",
      },
      {
        name: "Creative Commons Zero (≒ Public Domain)",
        value: "CC0-1.0",
      },
      {
        name: "All Rights Reserved",
        value: "UNLICENSED",
      },
    ],
  }),
  prjType: await select<"app" | "lib">({
    message: "Is this a library or an app?",
    choices: [
      {
        name: "Web App or Website",
        value: "app",
      },
      {
        name: "Library",
        value: "lib",
      },
    ],
  }),
  lang: await select<"js" | "ts">({
    message: "Which language do you use?",
    choices: [
      {
        name: "JavaScript",
        value: "js",
      },
      {
        name: "TypeScript",
        value: "ts",
      },
    ],
  }),
  runtimeEnv: await select<"browser" | "nodejs">({
    message: "Which environment do you use?",
    choices: [
      {
        name: "Browser",
        value: "browser",
      },
      {
        name: "Node.js",
        value: "nodejs",
      },
    ],
  }),
  ci: await select<"github" | "circleci">({
    message: "Which CI do you use?",
    choices: [
      {
        name: "GitHub Actions",
        value: "github",
      },
      {
        name: "CircleCI",
        value: "circleci",
      },
    ],
  }),
} as const;

const outDir = dirEmpty ? currentDir : join(currentDir, answers.prjName);

const templateFiles = (await readdir(templateDir, {
  recursive: true,
  withFileTypes: true,
})).map(({ name: fileName, path: absDirPath }) => {
  const absFilePath = join(absDirPath, fileName);
  const relFilePath = relative(templateDir, absFilePath);

  return {
    absDirPath,
    absFilePath,
    relFilePath,
  };
}).filter(({ absFilePath }) => !lstat(absFilePath).isDirectory());

type Question = keyof typeof answers;
type Answer = typeof answers[Question];
type ExcludeRule = {
  question: Question,
  answer: Answer,
  excludes: string[],
};

// const excludeRules: ExcludeRule[] = [
//   {
//     question: "license",
//     answer: "Apache-2.0",
//     excludes: [ "LICENSE-CC0", "LICENSE-MIT.ejs" ],
//   },
//   {
//     question: "license",
//     answer: "CC0-1.0",
//     excludes: [ "LICENSE-APACHE", "LICENSE-MIT.ejs" ],
//   },
//   {
//     question: "license",
//     answer: "MIT",
//     excludes: [ "LICENSE-APACHE", "LICENSE-CC0" ],
//   },
//   {
//     question: "license",
//     answer: "UNLICENSED",
//     excludes: [ "LICENSE-APACHE", "LICENSE-CC0", "LICENSE-MIT.ejs" ],
//   },
//   {
//     question: "ci",
//     answer: "github",
//     excludes: [ ".circleci/config.yml" ],
//   },
//   {
//     question: "ci",
//     answer: "circleci",
//     excludes: [ ".github/workflows/actions.yml" ],
//   },
// ];

type Filter = {[key: string]: (boolean | { use: boolean, renameTo: string })};

const filters: Filter = {
  "LICENSE-APACHE": {
    use: answers.license === "Apache-2.0",
    renameTo: "LICENSE",
  },
  "LICENSE-CC0": {
    use: answers.license === "CC0-1.0",
    renameTo: "LICENSE",
  },
  "LICENSE-MIT.ejs": {
    use: answers.license === "MIT",
    renameTo: "LICENSE",
  },
  "test/main.test.js": answers.lang === "js",
  "test/testutils.js": answers.lang === 'js',
  "tsconfig.json": answers.lang === 'ts',
  "test/main.test.ts": answers.lang === 'ts',
  "test/testutils.ts": answers.lang === 'ts',
  "test/tsconfig.json": answers.lang === 'ts',
  "webpack.config.js": answers.runtimeEnv === "browser",
  ".circleci/config.yml": answers.ci === "circleci",
  ".github/workflows/actions.yml": answers.ci === "github",
  "eslintrc.cjs": {
    use: true,
    renameTo: ".eslintrc.cjs",
  },
  "gitignore": {
    use: true,
    renameTo: ".gitignore",
  },
};

/// ▼▼▼▼後でテストに分離
// const excludeCandidateFiles = excludeRules.map(({ excludes }) => excludes).flat();
// for (const excludeCandidateFile of excludeCandidateFiles) {
//   if (!exists(join(templateDir, excludeCandidateFile))) {
//     throw new Error(`${excludeCandidateFile} does not exist!`);
//   }
// }
for (const excludeCandidateFile of Object.keys(filters)) {
  if (!exists(join(templateDir, excludeCandidateFile))) {
    throw new Error(`${excludeCandidateFile} does not exist as a template!`);
  }
}
/// ▲▲▲▲後でテストに分離

// const excludes = excludeRules
//   .filter(({ question, answer }) => answer === answers[question])
//   .map(({ excludes }) => excludes)
//   .flat();

for (const { absDirPath, absFilePath, relFilePath } of templateFiles) {
  const { use, renameTo } = typeof filters[relFilePath] === "boolean" ? { use: filters[relFilePath]} : filters[relFilePath];
  if (use === false) {
    continue;
  }

  await mkdir(absDirPath, { recursive: true });
  await cp(absFilePath, join(outDir, filters[relFilePath].renameTo ?? relFilePath));
}
