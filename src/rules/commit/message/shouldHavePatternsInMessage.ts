import git from "../../../git";
import { PatternsConfig } from "../../../types/Config";
import { FAIL, PASS, Rule, Rules } from "../../../types/Rule";
import util from "../../../util";

const apply = async (config: PatternsConfig, commit: string) => {
  const msg = await git.getCommitMessage(commit);
  if (!util.matchesPattern(msg, config.patterns)) {
    return FAIL(
      `Commit message should match one of the following patterns : ${
        config.patterns
      }`
    );
  } else {
    return PASS;
  }
};

const rule: Rule = { ...Rules.shouldHavePatternsInMessage, apply };

export default rule;
