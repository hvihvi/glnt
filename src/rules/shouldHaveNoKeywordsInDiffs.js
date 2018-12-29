const git = require("../git");
const logger = require("../logger");
const config = require("../config").config.shouldHaveNoKeywordsInDiffs;

const hasKeywordsInDiff = diffs =>
  config.keywords.some(keyword =>
    diffs
      .filter(diff => diff.startsWith("+"))
      .some(diff => diff.includes(keyword))
  );

const shouldHaveNoKeywordsInDiffs = async commit => {
  const diffs = await git.getCommitDiff(commit);
  if (hasKeywordsInDiff(diffs)) {
    logger.logWithSha1(
      `Diff content should not contain any of the following forbidden keywords : ${
        config.keywords
      }`,
      config.level,
      commit
    );
  }
};

module.exports = {
  shouldHaveNoKeywordsInDiffs,
  // Visible for testing
  hasKeywordsInDiff
};
