import git from "../../git";
import { PatternsConfig } from "../../types/Config";
import { FAIL, PASS, Rule, Rules } from "../../types/Rule";
import util from "../../util";

const apply = async (config: PatternsConfig) => {
  const branchName = await git.getCurrentBranch();
  if (!util.matchesPattern(branchName, config.patterns)) {
    return FAIL(
      `Branch name should match one of the following patterns : ${
        config.patterns
      }`
    );
  } else {
    return PASS;
  }
};

const rule: Rule = { ...Rules.shouldHavePatternsInBranchName, apply };

export default rule;
