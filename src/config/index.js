const config = {
  origin: "HEAD~20",
  shouldHaveTests: {
    enabled: true,
    level: "INFO",
    subject: "**/*.js",
    test: "**/*.test.js",
    untestedTag: "#untested"
  },
  shouldHaveFormattedMessage: {
    enabled: true,
    level: "ERROR",
    charactersPerLine: 72
  },
  shouldHaveNoKeywordsInDiffs: {
    enabled: true,
    level: "INFO",
    keywords: ["TODO"]
  }
};

module.exports = { config };
