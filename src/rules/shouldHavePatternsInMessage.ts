import { match } from "minimatch";
import config from "../config";
import git from "../git";
import { toLevel } from "../types/Level";
import { Rule } from "../types/Rule";
import util from "../util";

// Visible for testing
export const messageMatchesPattern = (msg: string, patterns: string[]) => {
  // TODO minimatch instead of includes
  return patterns.some(
    pattern => match(util.toLineArray(msg), pattern).length > 0
  );
};

const apply = async (commit: string) => {
  const msg = await git.getCommitMessage(commit);
  if (
    !messageMatchesPattern(msg, config.shouldHavePatternsInMessage.patterns)
  ) {
    return {
      pass: false,
      message: {
        content: `Commit message should match one of the following patterns : ${
          config.shouldHavePatternsInMessage.patterns
        }`,
        level,
        commit
      }
    };
  } else {
    return { pass: true };
  }
};

const name = "shouldHavePatternsInMessage";
const level = toLevel(config.shouldHavePatternsInMessage.level); // TODO rm toLevel

const rule: Rule = { name, apply, level };

export default rule;
