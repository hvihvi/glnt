import config from "../config";
import git from "../git";
import logger from "../logger";
import { toLevel } from "../types/Level";
import { Rule } from "../types/Rule";

const name = "shouldHaveNoKeywordsInDiffs";
const level = toLevel(config.shouldHaveNoKeywordsInDiffs.level); // TODO rm toLevel

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
    return {
      pass: false,
      message: {
        content: `Diff content should not contain any of the following forbidden keywords : ${
          config.shouldHaveNoKeywordsInDiffs.keywords
        }`,
        level,
        commit
      }
    };
  } else {
    return { pass: true };
  }
};

const rule: Rule = { name, apply, level };

export default rule;
