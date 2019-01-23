import config from "../config";
import git from "../git";
import logger from "../logger";
import { toLevel } from "../types/Level";

// Visible for testing
export const hasSeparatorLine = (msg: string) => {
  const lines = msg.split("\n");
  return lines.length > 1 && lines[1] !== "";
};
const shouldHaveSeparatorLine = (msg: string, commit: string) => {
  if (hasSeparatorLine(msg)) {
    logger.logWithSha1(
      `Commit message should have a separator line between header and body`,
      config.shouldHaveFormattedMessage.level,
      commit
    );
    return true;
  } else {
    return false;
  }
};

// Visible for testing
export const hasNCharPerLine = (msg: string) => {
  const lines = msg.split("\n");
  return lines.some(
    line => line.length > config.shouldHaveFormattedMessage.charactersPerLine
  );
};
const shouldHaveNCharPerLine = (msg: string, commit: string) => {
  if (hasNCharPerLine(msg)) {
    // TODO extract condition, no log in unit tests
    logger.logWithSha1(
      `Commit message should be wrapped to ${
        config.shouldHaveFormattedMessage.charactersPerLine
      }char per lines`,
      toLevel(config.shouldHaveFormattedMessage.level), // TODO rm toLevel
      commit
    );
    return true;
  } else {
    return false;
  }
};

const apply = async (commit: string) => {
  const msg = await git.getCommitMessage(commit);
  shouldHaveSeparatorLine(msg, commit);
  shouldHaveNCharPerLine(msg, commit);
};

export default { apply };
