const git = require("../git");
const config = require("../config").config.shouldHaveFormattedMessage;
const logger = require("../logger");

const hasSeparatorLine = msg => {
  const lines = msg.split("\n");
  return lines.length > 1 && lines[1] !== "";
};
const shouldHaveSeparatorLine = (msg, commit) => {
  if (hasSeparatorLine(msg)) {
    logger.logWithSha1(
      `Commit message should have a separator line between header and body`,
      config.level,
      commit
    );
    return true;
  } else return false;
};

const hasNCharPerLine = msg => {
  const lines = msg.split("\n");
  return lines.some(line => line.length > config.charactersPerLine);
};
const shouldHaveNCharPerLine = (msg, commit) => {
  if (hasNCharPerLine(msg)) {
    // TODO extract condition, no log in unit tests
    logger.logWithSha1(
      `Commit message should be wrapped to ${
        config.charactersPerLine
      }char per lines`,
      config.level,
      commit
    );
    return true;
  } else return false;
};

const shouldHaveFormattedMessage = async commit => {
  const msg = await git.getCommitMessage(commit);
  shouldHaveSeparatorLine(msg, commit);
  shouldHaveNCharPerLine(msg, commit);
};

module.exports = {
  shouldHaveFormattedMessage,
  // Visible for testing
  hasSeparatorLine,
  // Visible for testing
  hasNCharPerLine
};
