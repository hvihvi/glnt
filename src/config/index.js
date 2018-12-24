const config = {
  origin: "origin/master",
  shouldHaveTests: {
    enabled: true,
    subject: "**/*.js",
    test: "**/*.test.js"
  },
  shouldHaveFormattedMessage: {
    enabled: true,
    charactersPerLine: 80
  }
};

module.exports = { config };
