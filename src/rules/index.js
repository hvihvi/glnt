const git = require("../git/index");
const config = require("../config/index").config;
const shouldHaveTests = require("./shouldHaveTests").shouldHaveTests;
const shouldHaveFormattedMessage = require("./shouldHaveFormattedMessage")
  .shouldHaveFormattedMessage;
const shouldHaveNoKeywordsInDiffs = require("./shouldHaveNoKeywordsInDiffs")
  .shouldHaveNoKeywordsInDiffs;
const shouldHaveKeywordsInMessage = require("./shouldHaveKeywordsInMessage")
  .shouldHaveKeywordsInMessage;
const shouldMergeWithOtherBranches = require("./shouldMergeWithOtherBranches")
  .shouldMergeWithOtherBranches;

const applyRules = async () => {
  const base = await git.findCommonAncestor("HEAD", config.origin);
  const commits = await git.listCommits(base, "HEAD");

  // per commit rules
  commits.forEach(commit => applyCommitRules(commit));
  // HEAD rules
  shouldMergeWithOtherBranches();
};

const applyCommitRules = commit => {
  shouldHaveFormattedMessage(commit);
  shouldHaveTests(commit);
  shouldHaveNoKeywordsInDiffs(commit);
  shouldHaveKeywordsInMessage(commit);
};

module.exports = { applyRules };
