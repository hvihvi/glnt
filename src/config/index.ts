import findProjectRoot = require("find-project-root");
import { existsSync, readFileSync } from "fs";
import { prompts } from "prompts";
import logger from "../logger";
import { Config } from "../types/Config";

const CONF_FILE_NAME = ".glntrc.json";

const loadConfig = (): Config => {
  const projectRoot = findProjectRoot(process.cwd());
  const filename = projectRoot + "/" + CONF_FILE_NAME;
  if (!existsSync(filename)) {
    logger.logMissingConfig();
    // TODO prompt to create config + memoize config
    //
    // const response = await prompts.confirm({
    //   type: "confirm",
    //   name: "value",
    //   message: "Would you like to create a configuration file?",
    //   initial: true
    // });
    // console.log(response);
    return defaultConfig;
  }
  const loadedConfig = JSON.parse(readFileSync(filename, "utf8"));
  return { ...defaultConfig, ...loadedConfig };
};

const defaultConfig: Config = {
  origin: "origin/master",
  shouldHaveTests: {
    level: "INFO",
    subject: "**/*.js",
    test: "**/*.test.js",
    skipTags: [
      "#untested",
      "#refacto",
      "#refactoring",
      "#iso",
      "#trivial",
      "#notest"
    ]
  },
  shouldHaveNCharPerLine: {
    level: "INFO",
    charactersPerLine: 72
  },
  shouldHaveSeparatorLine: {
    level: "INFO"
  },
  shouldHaveNoKeywordsInDiffs: {
    level: "INFO",
    keywords: []
  },
  shouldHavePatternsInMessage: {
    level: "INFO",
    patterns: []
  },
  shouldMergeWithOtherBranches: {
    level: "INFO",
    pattern: "origin/*"
  },
  shouldNotBeUsedByOthers: {
    level: "INFO"
  }
};

export default { loadConfig };
