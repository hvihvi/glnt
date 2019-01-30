import findProjectRoot = require("find-project-root");
import { existsSync, readFileSync } from "fs";
import logger from "../logger";
import { Config } from "../types/Config";

const CONF_FILE_NAME = ".glntrc.json";

const loadConfig = (): Config => {
  const projectRoot = findProjectRoot(process.cwd());
  const filename = projectRoot + "/" + CONF_FILE_NAME;
  if (!existsSync(filename)) {
    logger.error(
      "Please create a config file first",
      "No .glntrc.json file found"
    );
    process.exit(1);
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

const config = loadConfig();

export default config;
