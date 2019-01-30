import config from "../config";
import git from "../git";
import { toLevel } from "../types/Level";
import { Rule } from "../types/Rule";

const name = "shouldNotBeUsedByOthers";

const level = toLevel(config.shouldNotBeUsedByOthers.level);

const apply = async (commit: string) => {
  const isUsedBy = await git.isUsedByBranches(commit);
  if (isUsedBy.length > 0) {
    return {
      pass: false,
      message: {
        content: `Other branches are using this commit : ${isUsedBy}
        Note: Avoid using git-rebase on this commit`,
        level,
        commit
      }
    };
  }
  return { pass: true };
};

const rule: Rule = { name, apply, level };

export default rule;
