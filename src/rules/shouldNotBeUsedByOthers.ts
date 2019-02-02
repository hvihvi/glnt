import git from "../git";
import { RuleConfig } from "../types/Config";
import { toLevel } from "../types/Level";
import { Rule } from "../types/Rule";

const name = "shouldNotBeUsedByOthers";

const apply = async (config: RuleConfig, commit: string) => {
  const isUsedBy = await git.isUsedByBranches(commit);
  if (isUsedBy.length > 0) {
    return {
      pass: false,
      message: {
        content: `Other branches are using this commit : ${isUsedBy}
        Note: Avoid using git-rebase on this commit`,
        level: toLevel(config.level),
        commit
      }
    };
  }
  return { pass: true };
};

const rule: Rule = { name, apply };

export default rule;
