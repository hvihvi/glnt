import git from "../../../git";
import { PatternsConfig } from "../../../types/Config";
import { FAIL, PASS, Rule, Rules } from "../../../types/Rule";

// Visible for testing
export const messageStartsWithUpperCase = (msg: string) => {
  return msg.charAt(0) === msg.charAt(0).toUpperCase();
};

const apply = async (config: PatternsConfig, commit: string) => {
  const msg = await git.getCommitMessage(commit);
  if (!messageStartsWithUpperCase(msg)) {
    return FAIL(`Commit message should start with an upper case`);
  } else {
    return PASS;
  }
};

const rule: Rule = { ...Rules.shouldStartMessageWithUpperCase, apply };

export default rule;
