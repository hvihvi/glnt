const git = require("../git/index");
const config = require("../config/index").config;
// const shouldHaveTests = require("./shouldHaveTests").shouldHaveTests;
// const shouldHaveFormattedMessage = require("./shouldHaveFormattedMessage")
//  .shouldHaveFormattedMessage;

const applyRules = async () => {
  const ancestor = await git.findCommonAncestor("HEAD", config.origin);
  console.log("ancestor:" + ancestor);
  const commits = await git.listCommits(config.origin, "HEAD~5");
  console.log(commits);
  // if (config.shouldHaveTests.enabled) {
  //   git.onEachCommitPatches(shouldHaveTests);
  // }
  // if (config.shouldHaveFormattedMessage.enabled) {
  //   git.onEachCommit(shouldHaveFormattedMessage);
  // }
};

module.exports = { applyRules };
