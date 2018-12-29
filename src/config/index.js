const config = {
  origin: "HEAD~10",
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
  }
};

module.exports = { config };
