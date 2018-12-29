const git = require("../git");
const config = require("../config").config.shouldHaveFormattedMessage;
const logger = require("../logger");

const shouldHaveSeparatorLine = (msg, commit) => {
  const lines = msg.split("\n");
  if (lines.length > 1 && lines[1] !== "") {
    logger.logWithSha1(
      `Commit message should have a separator line between header and body`,
      config.level,
      commit
    );
    return true;
  } else return false;
};

const shouldHaveNCharPerLine = (msg, commit) => {
  const lines = msg.split("\n");
  if (lines.filter(line => line.length > config.charactersPerLine).length > 0) {
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
  shouldHaveSeparatorLine,
  // Visible for testing
  shouldHaveNCharPerLine
};
