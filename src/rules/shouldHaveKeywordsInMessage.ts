import config from "../config";
import git from "../git";
import logger from "../logger";
import { toLevel } from "../types/Level";
import { Rule } from "../types/Rule";

// Visible for testing
export const hasKeywordInMessage = (msg: string, keywords: string[]) =>
  keywords.some(keyword => msg.includes(keyword));

const apply = async (commit: string) => {
  const msg = await git.getCommitMessage(commit);
  if (!hasKeywordInMessage(msg, config.shouldHaveKeywordsInMessage.keywords)) {
    return {
      pass: false,
      message: {
        content: `Commit message should contain one of the following keywords : ${
          config.shouldHaveKeywordsInMessage.keywords
        }`,
        level,
        commit
      }
    };
  } else {
    return { pass: true };
  }
};

const name = "shouldHaveKeywordsInMessage";
const level = toLevel(config.shouldHaveKeywordsInMessage.level); // TODO rm toLevel

const rule: Rule = { name, apply, level };

export default rule;
