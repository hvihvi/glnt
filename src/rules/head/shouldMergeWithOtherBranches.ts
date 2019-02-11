import chalk from "chalk";
import git from "../../git";
import { PatternConfig } from "../../types/Config";
import { Apply, FAIL, PASS, Rule, RuleName } from "../../types/Rule";

const apply: Apply = async (config: PatternConfig) => {
  const isCleanWorkDir = await git.isCleanWorkDir();
  if (!isCleanWorkDir) {
    return FAIL("Git working directory must be clean to perform merge checks");
  }
  const branches: string[] = await git.listRemoteBranches(config.pattern);
  const conflictBranches = [];
  console.log(chalk.yellow("Starting merge checks..."));
  for (const br of branches) {
    const canMerge = await git.canMerge(br);
    if (!canMerge) {
      conflictBranches.push(br);
    }
  }
  if (conflictBranches.length > 0) {
    return FAIL(
      `Current HEAD has conflict with other branches: ${conflictBranches}`
    );
  }
  return PASS;
};

const rule: Rule = { name: RuleName.MERGE, apply };

export default rule;
