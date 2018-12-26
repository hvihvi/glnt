const config = {
  origin: "origin/master",
  shouldHaveTests: {
    enabled: true,
    level: "INFO",
    subject: "**/*.js",
    test: "**/*.test.js"
  },
  shouldHaveFormattedMessage: {
    enabled: true,
    level: "ERROR",
    charactersPerLine: 80
  }
};

module.exports = { config };
