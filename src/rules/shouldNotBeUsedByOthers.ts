import git from "../git";
import { IgnoresConfig } from "../types/Config";
import { FAIL, PASS, Rule } from "../types/Rule";

const name = "shouldNotBeUsedByOthers";

// Visible for Testing
export const users = (
  isUsedBy: string[],
  ignores: string[],
  origin: string
): string[] => {
  return isUsedBy.filter(usedBy => !ignores.concat([origin]).includes(usedBy));
};

const apply = async (config: IgnoresConfig, commit: string, origin: string) => {
  const isUsedBy = await git.isUsedByBranches(commit);
  const isUsedByFiltered = users(isUsedBy, config.ignores, origin);
  if (isUsedByFiltered.length > 0) {
    return FAIL(`Other branches are using this commit : ${isUsedByFiltered}
        Note: Avoid using git-rebase on this commit`);
  }
  return PASS;
};

const rule: Rule = { name, apply };

export default rule;
