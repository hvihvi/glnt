const git = require("../git/index");
const config = require("../config/index").config;
const shouldHaveTests = require("./shouldHaveTests").shouldHaveTests;
const shouldHaveFormattedMessage = require("./shouldHaveFormattedMessage")
  .shouldHaveFormattedMessage;
const shouldHaveNoKeywordsInDiffs = require("./shouldHaveNoKeywordsInDiffs")
  .shouldHaveNoKeywordsInDiffs;

const applyRules = async () => {
  const base = await git.findCommonAncestor("HEAD", config.origin);
  const commits = await git.listCommits(base, "HEAD");

  commits.forEach(commit => applyCommitRules(commit));
};

const applyCommitRules = commit => {
  shouldHaveFormattedMessage(commit);
  shouldHaveTests(commit);
  shouldHaveNoKeywordsInDiffs(commit);
};

module.exports = { applyRules };
