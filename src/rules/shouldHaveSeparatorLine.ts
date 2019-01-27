import config from "../config";
import git from "../git";
import { toLevel } from "../types/Level";
import { Result, Rule } from "../types/Rule";

const name = "shouldHaveSeparatorLine";

const level = toLevel(config.shouldHaveSeparatorLine.level);

// Visible for testing
export const hasNoSeparatorLine = (msg: string) => {
  const lines = msg.split("\n");
  return lines.length > 1 && lines[1] !== "";
};

const shouldHaveSeparatorLine = (msg: string, commit: string): Result => {
  if (hasNoSeparatorLine(msg)) {
    return {
      pass: false,
      message: {
        content: `Commit message should have a separator line between header and body`,
        level,
        commit
      }
    };
  }
  return { pass: true };
};

const apply = async (commit: string) => {
  const msg = await git.getCommitMessage(commit);
  return shouldHaveSeparatorLine(msg, commit);
};

const rule: Rule = { name, apply, level };

export default rule;
