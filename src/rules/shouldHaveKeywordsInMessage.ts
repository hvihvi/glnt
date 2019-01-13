import config from "../config";
import git from "../git";
import logger from "../logger";

// Visible for testing
export const hasKeywordInMessage = (msg: string, keywords: string[]) =>
  keywords.some(keyword => msg.includes(keyword));

const apply = async (commit: string) => {
  const msg = await git.getCommitMessage(commit);
  if (!hasKeywordInMessage(msg, config.shouldHaveKeywordsInMessage.keywords)) {
    logger.logWithSha1(
      `Commit message should contain one of the following keywords : ${
        config.shouldHaveKeywordsInMessage.keywords
      }`,
      config.shouldHaveKeywordsInMessage.level,
      commit
    );
  }
};

export default { apply };
