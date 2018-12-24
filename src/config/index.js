const config = {
  origin: "origin/master",
  shouldHaveTests: {
    enabled: true,
    subject: "**/*.js",
    test: "**/*.test.js"
  },
  shouldHaveFormattedMessage: {
    enabled: true
  }
};

module.exports = { config };
