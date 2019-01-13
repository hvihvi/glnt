import config from "../config/index";
import git from "../git/index";
import shouldHaveFormattedMessage from "./shouldHaveFormattedMessage";
import shouldHaveKeywordsInMessage from "./shouldHaveKeywordsInMessage";
import shouldHaveNoKeywordsInDiffs from "./shouldHaveNoKeywordsInDiffs";
import shouldHaveTests from "./shouldHaveTests";
import shouldMergeWithOtherBranches from "./shouldMergeWithOtherBranches";

const applyRules = async () => {
  const base = await git.findCommonAncestor("HEAD", config.origin);
  const commits = await git.listCommits(base, "HEAD");

  // per commit rules
  commits.forEach(commit => applyCommitRules(commit));
  // HEAD rules
  shouldMergeWithOtherBranches.apply();
};

const applyCommitRules = commit => {
  shouldHaveFormattedMessage.apply(commit);
  shouldHaveTests.apply(commit);
  shouldHaveNoKeywordsInDiffs.apply(commit);
  shouldHaveKeywordsInMessage.apply(commit);
};

export default { applyRules };
