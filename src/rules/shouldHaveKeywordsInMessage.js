const git = require("../git");
const logger = require("../logger");
const config = require("../config").config.shouldHaveKeywordsInMessage;

const hasKeywordInMessage = (msg, keywords) =>
  keywords.some(keyword => msg.includes(keyword));

const shouldHaveKeywordsInMessage = async commit => {
  const msg = await git.getCommitMessage(commit);
  if (!hasKeywordInMessage(msg, config.keywords)) {
    logger.logWithSha1(
      `Commit message should contain one of the following keywords : ${
        config.keywords
      }`,
      config.level,
      commit
    );
  }
};

module.exports = {
  shouldHaveKeywordsInMessage,
  // Visible for testing
  hasKeywordInMessage
};
