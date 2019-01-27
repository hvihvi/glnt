import config from "../config";
import git from "../git";
import { toLevel } from "../types/Level";
import { Rule } from "../types/Rule";

const name = "shouldHaveNCharPerLine";

const level = toLevel(config.shouldHaveNCharPerLine.level);

// Visible for testing
export const hasMoreThanNCharPerLine = (msg: string) => {
  const lines = msg.split("\n");
  return lines.some(
    line => line.length > config.shouldHaveNCharPerLine.charactersPerLine
  );
};

const shouldHaveNCharPerLine = (msg: string, commit: string) => {
  if (hasMoreThanNCharPerLine(msg)) {
    // TODO extract condition, no log in unit tests
    return {
      pass: false,
      message: {
        content: `Commit message should be wrapped to ${
          config.shouldHaveNCharPerLine.charactersPerLine
        }char per lines`,
        level,
        commit
      }
    };
  } else {
    return { pass: true };
  }
};

const apply = async (commit: string) => {
  const msg = await git.getCommitMessage(commit);
  return shouldHaveNCharPerLine(msg, commit);
};

const rule: Rule = { name, apply, level };

export default rule;
