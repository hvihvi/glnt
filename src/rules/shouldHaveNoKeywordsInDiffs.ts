import config from "../config";
import git from "../git";
import logger from "../logger";
import { toLevel } from "../types/Level";

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
      toLevel(config.shouldHaveNoKeywordsInDiffs.level), // TODO rm toLevel
      commit
    );
  }
};

export default { apply };
