const git = require("../git/index");
const config = require("../config/index").config;
// const shouldHaveTests = require("./shouldHaveTests").shouldHaveTests;
const shouldHaveFormattedMessage = require("./shouldHaveFormattedMessage")
  .shouldHaveFormattedMessage;

const applyRules = async () => {
  const ancestor = await git.findCommonAncestor("HEAD", config.origin);
  console.log("[DEBUG] ancestor:" + ancestor);
  const commits = await git.listCommits(ancestor, "HEAD");
  console.log("[DEBUG] commit list:" + commits);

  commits.forEach(commit => applyCommitRules(commit));
  // if (config.shouldHaveTests.enabled) {
  //   git.onEachCommitPatches(shouldHaveTests);
  // }
};

const applyCommitRules = commit => {
  shouldHaveFormattedMessage(commit);
};

module.exports = { applyRules };
