import chalk from "chalk";
import config from "../config";
import git from "../git";
import { toLevel } from "../types/Level";
import { Apply, PASS, Rule } from "../types/Rule";

const name = "shouldMergeWithOtherBranches";
const cfg = config.shouldMergeWithOtherBranches;
const level = toLevel(cfg.level);
const FAIL_WORKDIR = {
  pass: false,
  message: {
    content: "Git working directory must be clean to perform merge checks",
    level
  }
};

const FAIL_CONFLICT = (conflictBranches: string[]) => {
  return {
    pass: false,
    message: {
      content: `Current HEAD has conflict with other branches: ${conflictBranches}`,
      level
    }
  };
};

const apply: Apply = async () => {
  const isCleanWorkDir = await git.isCleanWorkDir();
  if (!isCleanWorkDir) {
    return FAIL_WORKDIR;
  }
  const branches: string[] = await git.listRemoteBranches("origin/*");
  const conflictBranches = [];
  console.log(chalk.yellow("Starting merge checks..."));
  for (const br of branches) {
    const canMerge = await git.canMerge(br);
    if (!canMerge) {
      conflictBranches.push(br);
    }
  }
  if (conflictBranches.length > 0) {
    return FAIL_CONFLICT(conflictBranches);
  }
  return PASS;
};

const rule: Rule = { name, apply, level };

export default rule;
