import config from "../config";
import git from "../git";
import logger from "../logger";

// Visible for testing
export const hasKeywordsInDiff = diffs =>
  config.shouldHaveNoKeywordsInDiffs.keywords.some(keyword =>
    diffs
      .filter(diff => diff.startsWith("+"))
      .some(diff => diff.includes(keyword))
  );

const apply = async commit => {
  const diffs = await git.getCommitDiff(commit);
  if (hasKeywordsInDiff(diffs)) {
    logger.logWithSha1(
      `Diff content should not contain any of the following forbidden keywords : ${
        config.shouldHaveNoKeywordsInDiffs.keywords
      }`,
      config.shouldHaveNoKeywordsInDiffs.level,
      commit
    );
  }
};

export default { apply };
