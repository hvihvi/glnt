import chalk from "chalk";
import git from "../git";
import { PatternConfig } from "../types/Config";
import { toLevel } from "../types/Level";
import { Apply, PASS, Rule } from "../types/Rule";

const name = "shouldMergeWithOtherBranches";

const FAIL_WORKDIR = (level: string) => {
  return {
    pass: false,
    message: {
      content: "Git working directory must be clean to perform merge checks",
      level: toLevel(level)
    }
  };
};

const FAIL_CONFLICT = (conflictBranches: string[], level: string) => {
  return {
    pass: false,
    message: {
      content: `Current HEAD has conflict with other branches: ${conflictBranches}`,
      level: toLevel(level)
    }
  };
};

const apply: Apply = async (config: PatternConfig) => {
  const isCleanWorkDir = await git.isCleanWorkDir();
  if (!isCleanWorkDir) {
    return FAIL_WORKDIR(config.level);
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
    return FAIL_CONFLICT(conflictBranches, config.level);
  }
  return PASS;
};

const rule: Rule = { name, apply };

export default rule;
