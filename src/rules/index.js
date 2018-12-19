const { onEachCommit, onEachCommitPatches } = require("../git/index");
const config = require("../config/index").config;
const shouldHaveTests = require("./shouldHaveTests").shouldHaveTests;
const shouldHaveFormattedMessage = require("./shouldHaveFormattedMessage")
  .shouldHaveFormattedMessage;

const applyRules = () => {
  console.log("[DEBUG] Applying rules");
  if (config.shouldHaveTests.enabled) {
    onEachCommitPatches(shouldHaveTests);
  }
  if (config.shouldHaveFormattedMessage.enabled) {
    onEachCommit(shouldHaveFormattedMessage);
  }
};

module.exports = { applyRules };
