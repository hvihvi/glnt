import { prompts } from "prompts";
import { Config } from "../types/Config";
import defaultConfig from "./defaultConfig";
import chalk from "chalk";
import { Rules } from "../types/Rule";

const run = async () => {
  console.log(chalk.red.bold.underline("No .glntrc.json config file found"));

  const createOk = await prompts.confirm({
    type: "confirm",
    name: "createOk",
    message: "Would you like to create a configuration file?",
    initial: true
  });
  // exit with error code 1 if no file creation accepted
  if (!createOk) {
    process.exit(1);
  }

  const origin = await prompts.text({
    type: "text",
    name: "targetBranch",
    message: `Which branch do you target? (The final destination for your commits)`,
    initial: "origin/master"
  });

  const useDefault = await prompts.select({
    type: "select",
    name: "useDefault",
    message: "Would you like to :",
    choices: [
      { title: "Use default configuration", value: true },
      { title: "Configure a few linter rules now", value: false }
    ],
    initial: 0
  });
  // if default config ok, return default config
  if (await useDefault) {
    return { ...defaultConfig, origin };
  }

  // ask for commit message rules
  const shouldHaveNCharPerLine = await configureShouldHaveNCharPerLine();
  const shouldStartMessageWithUpperCase = await configureShouldStartMessageWithUpperCase();
  const shouldHaveSeparatorLine = await configureShouldHaveSeparatorLine();

  // ask for commit rules
  const shouldNotBeUsedByOthers = await configureShouldNotBeUsedByOthers();
  const shouldHaveTests = await configureShouldHaveTests();

  // ask for head rules
  const shouldMergeWithOtherBranches = await configureShouldMergeWithOtherBranches();

  const config: Config = {
    ...defaultConfig,
    origin,
    shouldHaveTests,
    shouldHaveNCharPerLine,
    shouldHaveSeparatorLine,
    shouldMergeWithOtherBranches,
    shouldNotBeUsedByOthers,
    shouldStartMessageWithUpperCase
  };
  return config;
};

const configureLevel = async ({ name, desc }) => {
  console.log(
    "\n" + chalk.cyanBright.bold.underline(name) + chalk.bold(" " + desc)
  );
  const level = await prompts.select({
    type: "select",
    name: name + "Level",
    message: "Select a level of criticity :",
    choices: [
      { title: "info", value: "INFO" },
      { title: "error", value: "ERROR" },
      { title: "disable", value: "DISABLED" }
    ],
    initial: 0
  });
  return level;
};

const configureShouldHaveNCharPerLine = async () => {
  const level = await configureLevel(Rules.shouldHaveNCharPerLine);
  if (level === "DISABLED") {
    return { level, charactersPerLine: 72 };
  }
  const charactersPerLine = await prompts.number({
    type: "number",
    name: Rules.shouldHaveNCharPerLine.name + "CharactersPerLine",
    message: "Characters per line :",
    initial: 72
  });
  return { level, charactersPerLine };
};

const configureShouldNotBeUsedByOthers = async () => {
  const level = await configureLevel(Rules.shouldNotBeUsedByOthers);
  return { level, ignores: [] };
};

const configureShouldStartMessageWithUpperCase = async () => {
  const level = await configureLevel(Rules.shouldStartMessageWithUpperCase);
  return { level };
};

const configureShouldHaveSeparatorLine = async () => {
  const level = await configureLevel(Rules.shouldHaveSeparatorLine);
  return { level };
};

const configureShouldMergeWithOtherBranches = async () => {
  const level = await configureLevel(Rules.shouldMergeWithOtherBranches);
  if (level === "DISABLED") {
    return { level, pattern: "" };
  }
  const pattern = await prompts.text({
    type: "text",
    name: Rules.shouldMergeWithOtherBranches.name + "Pattern",
    message: "Pattern :",
    initial: "origin/*"
  });
  return { level, pattern };
};

const configureShouldHaveTests = async () => {
  const level = await configureLevel(Rules.shouldHaveTests);
  if (level === "DISABLED") {
    return { level, subject: "", test: "", skipTags: [] };
  }
  const subject = await prompts.text({
    type: "text",
    name: Rules.shouldHaveTests.name + "Subject",
    message: "Blob pattern for code files :",
    initial: "**/*.js"
  });
  const test = await prompts.text({
    type: "text",
    name: Rules.shouldHaveTests.name + "Test",
    message: "Blob pattern for test files :",
    initial: "**/*.test.js"
  });
  return {
    level,
    subject,
    test,
    skipTags: defaultConfig.shouldHaveTests.skipTags
  };
};

export default { run };
