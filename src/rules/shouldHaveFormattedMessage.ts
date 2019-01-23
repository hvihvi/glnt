import config from "../config";
import git from "../git";
import logger from "../logger";
import { toLevel } from "../types/Level";
import { Result, Rule } from "../types/Rule";

const name = "shouldHaveFormattedMessage";

const level = toLevel(config.shouldHaveFormattedMessage.level);

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

// Visible for testing
export const hasMoreThanNCharPerLine = (msg: string) => {
  const lines = msg.split("\n");
  return lines.some(
    line => line.length > config.shouldHaveFormattedMessage.charactersPerLine
  );
};
const shouldHaveNCharPerLine = (msg: string, commit: string) => {
  if (hasMoreThanNCharPerLine(msg)) {
    // TODO extract condition, no log in unit tests
    return {
      pass: false,
      message: {
        content: `Commit message should be wrapped to ${
          config.shouldHaveFormattedMessage.charactersPerLine
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
  // TODO split in 2 rules
  const result1 = shouldHaveSeparatorLine(msg, commit);
  if (!result1.pass) {
    return result1;
  } else {
    return shouldHaveNCharPerLine(msg, commit);
  }
};

const rule: Rule = { name, apply, level };

export default rule;
