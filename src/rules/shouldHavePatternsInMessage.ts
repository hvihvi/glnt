import { match } from "minimatch";
import git from "../git";
import { PatternsConfig } from "../types/Config";
import { Rule } from "../types/Rule";
import util from "../util";

// Visible for testing
export const messageMatchesPattern = (msg: string, patterns: string[]) => {
  return patterns.some(
    pattern => match(util.toLineArray(msg), pattern).length > 0
  );
};

const apply = async (config: PatternsConfig, commit: string) => {
  const msg = await git.getCommitMessage(commit);
  if (!messageMatchesPattern(msg, config.patterns)) {
    return {
      pass: false,
      message: {
        content: `Commit message should match one of the following patterns : ${
          config.patterns
        }`,
        commit
      }
    };
  } else {
    return { pass: true };
  }
};

const name = "shouldHavePatternsInMessage";

const rule: Rule = { name, apply };

export default rule;
