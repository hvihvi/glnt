import findProjectRoot = require("find-project-root");
import { readFileSync } from "fs";
import { Config } from "../types/Config";

const CONF_FILE_NAME = ".gintrc.json";

const loadConfig = () => {
  const projectRoot = findProjectRoot(process.cwd());
  const loadedConfig = JSON.parse(
    readFileSync(projectRoot + "/" + CONF_FILE_NAME, "utf8")
  );
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
