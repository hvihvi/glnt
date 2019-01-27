import findProjectRoot = require("find-project-root");
import { existsSync, readFileSync } from "fs";
import logger from "../logger";
import { Config } from "../types/Config";

const CONF_FILE_NAME = ".glntrc.json";

const loadConfig = () => {
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
    enabled: true,
    level: "INFO",
    subject: "**/*.js",
    test: "**/*.test.js",
    untestedTag: "#untested"
  },
  shouldHaveNCharPerLine: {
    enabled: true,
    level: "INFO",
    charactersPerLine: 72
  },
  shouldHaveSeparatorLine: {
    enabled: true,
    level: "INFO"
  },
  shouldHaveNoKeywordsInDiffs: {
    enabled: true,
    level: "INFO",
    keywords: ["TODO"]
  },
  shouldHaveKeywordsInMessage: {
    enabled: false,
    level: "INFO",
    keywords: ["#ISSUE-"]
  },
  shouldMergeWithOtherBranches: {
    enabled: true,
    level: "INFO"
  }
};

const config = loadConfig();

export default config;
