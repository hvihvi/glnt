import { prompts } from "prompts";
import { Config } from "../types/Config";
import defaultConfig from "./defaultConfig";
import chalk from "chalk";
import { RuleName } from "../types/Rule";

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

  const shouldNotBeUsedByOthers = await configureShouldNotBeUsedByOthers();

  const shouldHaveNCharPerLine = await configureShouldHaveNCharPerLine();

  const shouldHaveSeparatorLine = await configureShouldHaveSeparatorLine();

  const shouldMergeWithOtherBranches = await configureShouldMergeWithOtherBranches();

  const shouldHaveTests = await configureShouldHaveTests();

  const config: Config = {
    ...defaultConfig,
    origin,
    shouldHaveTests,
    shouldHaveNCharPerLine,
    shouldHaveSeparatorLine,
    shouldMergeWithOtherBranches,
    shouldNotBeUsedByOthers
  };
  return config;
};

const configureLevel = async (ruleName: string, desc: string) => {
  console.log(
    "\n" + chalk.cyanBright.bold.underline(ruleName) + chalk.bold(" " + desc)
  );
  const level = await prompts.select({
    type: "select",
    name: ruleName + "Level",
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
  const level = await configureLevel(
    RuleName.N_CHAR_PER_LINE,
    "Checks if commit messages are wrapped to a certain amount of character per line (recommend 72 to ease readability with most tools)"
  );
  if (level === "DISABLED") {
    return { level, charactersPerLine: 72 };
  }
  const charactersPerLine = await prompts.number({
    type: "number",
    name: RuleName.N_CHAR_PER_LINE + "CharactersPerLine",
    message: "Characters per line :",
    initial: 72
  });
  return { level, charactersPerLine };
};

const configureShouldNotBeUsedByOthers = async () => {
  const level = await configureLevel(
    RuleName.NOT_USED_BY_OTHERS,
    "Checks if any other remote branches use your commits (useful to check wether it's safe to use git-rebase for example)"
  );
  return { level, ignores: [] };
};

const configureShouldHaveSeparatorLine = async () => {
  const level = await configureLevel(
    RuleName.SEPARATOR_LINE,
    "Checks if commit messages have a blank line between header and body (recommended for certain tools)"
  );
  return { level };
};

const configureShouldMergeWithOtherBranches = async () => {
  const level = await configureLevel(
    RuleName.MERGE,
    "Check if the current branch merges with other branches that match a pattern"
  );
  if (level === "DISABLED") {
    return { level, pattern: "" };
  }
  const pattern = await prompts.text({
    type: "text",
    name: RuleName.MERGE + "Pattern",
    message: "Pattern :",
    initial: "origin/*"
  });
  return { level, pattern };
};

const configureShouldHaveTests = async () => {
  const level = await configureLevel(
    RuleName.TESTS,
    "Check if commits that include code modification also include tests, or explain in commit message the reason for not having one"
  );
  if (level === "DISABLED") {
    return { level, subject: "", test: "", skipTags: [] };
  }
  const subject = await prompts.text({
    type: "text",
    name: RuleName.TESTS + "Subject",
    message: "Blob pattern for code files :",
    initial: "**/*.js"
  });
  const test = await prompts.text({
    type: "text",
    name: RuleName.TESTS + "Test",
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
