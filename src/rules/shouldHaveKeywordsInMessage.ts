import { match } from "minimatch";
import config from "../config";
import git from "../git";
import { toLevel } from "../types/Level";
import { Rule } from "../types/Rule";

// Visible for testing
export const messageMatchesPattern = (msg: string, patterns: string[]) =>
  // TODO minimatch instead of includes
  patterns.some(pattern => msg.includes(pattern));

const apply = async (commit: string) => {
  const msg = await git.getCommitMessage(commit);
  if (
    !messageMatchesPattern(msg, config.shouldHaveKeywordsInMessage.patterns)
  ) {
    return {
      pass: false,
      message: {
        content: `Commit message should match one of the following patterns : ${
          config.shouldHaveKeywordsInMessage.patterns
        }`,
        level,
        commit
      }
    };
  } else {
    return { pass: true };
  }
};

const name = "shouldHaveKeywordsInMessage";
const level = toLevel(config.shouldHaveKeywordsInMessage.level); // TODO rm toLevel

const rule: Rule = { name, apply, level };

export default rule;
