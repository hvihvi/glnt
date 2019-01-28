import config from "../config";
import git from "../git";
import { Level } from "../types/Level";
import { Apply, Rule } from "../types/Rule";

const cfg = config.shouldMergeWithOtherBranches;

const name = "shouldMergeWithOtherBranches";

const level = Level.INFO;

const apply: Apply = async () => {
  const isCleanWorkDir = await git.isCleanWorkDir();
  // if (!isCleanWorkDir) {
  //   logger.log(
  //     "Git working directory must be clean to perform merge checks",
  //     cfg.level
  //   );
  //   return;
  // }
  const remotes = await git.listRemotes();
  return {
    pass: true,
    message: { content: "TODO shouldMergeWithOtherBranches", level }
  };
};

const rule: Rule = { name, apply, level };

export default rule;
