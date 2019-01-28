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

const apply: Apply = async () => {
  const isCleanWorkDir = await git.isCleanWorkDir();
  if (!isCleanWorkDir) {
    return FAIL_WORKDIR;
  }
  const branches: string[] = await git.listRemoteBranches("origin/*");
  console.log(branches);
  return PASS;
};

const rule: Rule = { name, apply, level };

export default rule;
