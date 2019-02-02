import git from "../git";
import { RuleConfig } from "../types/Config";
import { FAIL, PASS, Rule } from "../types/Rule";

const name = "shouldNotBeUsedByOthers";

const apply = async (config: RuleConfig, commit: string) => {
  const isUsedBy = await git.isUsedByBranches(commit);
  if (isUsedBy.length > 0) {
    return FAIL(`Other branches are using this commit : ${isUsedBy}
        Note: Avoid using git-rebase on this commit`);
  }
  return PASS;
};

const rule: Rule = { name, apply };

export default rule;
