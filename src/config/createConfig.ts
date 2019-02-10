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

  const shouldNotBeUsedByOthers = await configureShouldNotBeUsedByOthers(
    RuleName.NOT_USED_BY_OTHERS
  );

  const shouldHaveNCharPerLine = await configureShouldHaveNCharPerLine(
    RuleName.N_CHAR_PER_LINE
  );

  const shouldHaveSeparatorLine = await configureShouldHaveSeparatorLine(
    RuleName.SEPARATOR_LINE
  );

  const shouldMergeWithOtherBranches = await configureShouldMergeWithOtherBranches(
    RuleName.MERGE
  );

  const shouldHaveTests = await configureShouldHaveTests("shouldHaveTests");

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

const configureShouldHaveNCharPerLine = async (ruleName: string) => {
  const level = await configureLevel(
    ruleName,
    "Checks if commit messages are wrapped to a certain amount of character per line (recommend 72 to ease readability with most tools)"
  );
  if (level === "DISABLED") {
    return { level, charactersPerLine: 72 };
  }
  const charactersPerLine = await prompts.number({
    type: "number",
    name: ruleName + "CharactersPerLine",
    message: "Characters per line :",
    initial: 72
  });
  return { level, charactersPerLine };
};

const configureShouldNotBeUsedByOthers = async (ruleName: string) => {
  const level = await configureLevel(
    ruleName,
    "Checks if any other remote branches use your commits (useful to check wether it's safe to use git-rebase for example)"
  );
  return { level, ignores: [] };
};

const configureShouldHaveSeparatorLine = async (ruleName: string) => {
  const level = await configureLevel(
    ruleName,
    "Checks if commit messages have a blank line between header and body (recommended for certain tools)"
  );
  return { level };
};

const configureShouldMergeWithOtherBranches = async (ruleName: string) => {
  const level = await configureLevel(
    ruleName,
    "Check if the current branch merges with other branches that match a pattern"
  );
  if (level === "DISABLED") {
    return { level, pattern: "" };
  }
  const pattern = await prompts.text({
    type: "text",
    name: ruleName + "Pattern",
    message: "Pattern :",
    initial: "origin/*"
  });
  return { level, pattern };
};

const configureShouldHaveTests = async (ruleName: string) => {
  const level = await configureLevel(
    ruleName,
    "Check if commits that includes code modification also includes tests, or explains in commit message the reason for not having one"
  );
  if (level === "DISABLED") {
    return { level, subject: "", test: "", skipTags: [] };
  }
  const subject = await prompts.text({
    type: "text",
    name: ruleName + "Subject",
    message: "Blob pattern for code files :",
    initial: "**/*.js"
  });
  const test = await prompts.text({
    type: "text",
    name: ruleName + "Test",
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
