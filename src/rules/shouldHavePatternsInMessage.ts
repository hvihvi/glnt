import { match } from "minimatch";
import git from "../git";
import { PatternsConfig } from "../types/Config";
import { FAIL, PASS, Rule } from "../types/Rule";
import util from "../util";

// Visible for testing
export const messageMatchesPattern = (msg: string, patterns: string[]) => {
  if (patterns.length === 0) {
    return true;
  }
  return patterns.some(
    pattern => match(util.toLineArray(msg), pattern).length > 0
  );
};

const apply = async (config: PatternsConfig, commit: string) => {
  const msg = await git.getCommitMessage(commit);
  if (!messageMatchesPattern(msg, config.patterns)) {
    return FAIL(
      `Commit message should match one of the following patterns : ${
        config.patterns
      }`
    );
  } else {
    return PASS;
  }
};

const name = "shouldHavePatternsInMessage";

const rule: Rule = { name, apply };

export default rule;
