import config from "../config";
import git from "../git";
import logger from "../logger";
import { Level } from "../types/Level";

const cfg = config.shouldMergeWithOtherBranches;

const apply = async () => {
  const isCleanWorkDir = await git.isCleanWorkDir();
  // if (!isCleanWorkDir) {
  //   logger.log(
  //     "Git working directory must be clean to perform merge checks",
  //     cfg.level
  //   );
  //   return;
  // }
  const remotes = await git.listRemotes();
  console.log(remotes);
  logger.log("TODO shouldMergeWithOtherBranches", Level.INFO);
};

export default { apply };
