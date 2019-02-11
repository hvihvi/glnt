import { Config } from "../types/Config";

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
  shouldStartMessageWithUpperCase: {
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
    level: "INFO",
    ignores: []
  }
};

export default defaultConfig;
