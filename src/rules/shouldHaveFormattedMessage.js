const git = require("../git");
const config = require("../config").config.shouldHaveFormattedMessage;
const logger = require("../logger");

const isBadMessage = msg => {
  return shouldHaveSeparatorLine(msg) || shouldHaveNCharPerLine(msg);
};

const shouldHaveSeparatorLine = msg => {
  const lines = msg.split("\n");
  if (lines.length > 1 && lines[1] !== "") {
    return true;
  } else return false;
};

const shouldHaveNCharPerLine = msg => {
  const lines = msg.split("\n");
  if (lines.filter(line => line.length > config.charactersPerLine).length > 0) {
    return true;
  } else return false;
};

const shouldHaveFormattedMessage = async commit => {
  const msg = await git.getCommitMessage(commit);
  if (isBadMessage(msg)) {
    const shortHash = await git.toShortHash(commit);
    logger.log(
      `[${shortHash}] Should have formatted message : ${msg}`,
      config.level
    );
  }
};

module.exports = {
  shouldHaveFormattedMessage,
  // Visible for testing
  shouldHaveSeparatorLine,
  // Visible for testing
  isBadMessage,
  // Visible for testing
  shouldHaveNCharPerLine
};
