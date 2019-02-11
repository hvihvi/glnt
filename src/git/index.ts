import chalk from "chalk";
import utils from "../util";
import { git } from "./util";

const findCommonAncestor = async (branch1, branch2) => {
  return git(`merge-base ${branch1} ${branch2}`);
};

/**
 * Returns an array of strings, their value is the full sha1 of commits reachable from head not in base
 */
const listCommits = async (base, head) =>
  git(`rev-list ${base}..${head}`).then(str => utils.toLineArray(str));

const getCommitMessage = sha1 => git(`show -s --format=%B ${sha1}`);

const getCurrentBranch = () => git(`rev-parse --abbrev-ref HEAD`);

const toShortHash = sha1 => git(`rev-parse --short ${sha1}`);

/**
 * Returns an array of strings, their value is the path to modified filenames in given commit
 */
const getCommitFiles = sha1 =>
  git(`diff-tree --no-commit-id --name-only -r ${sha1}`).then(str =>
    utils.toLineArray(str)
  );

/**
 * Returns a string containing the diff patch of the commit
 */
const getCommitDiff = sha1 =>
  git(`diff-tree -p ${sha1}`).then(str => utils.toLineArray(str));

/**
 * Returns wether the working directory is clean or not
 */
const isCleanWorkDir = async () => {
  const result = await git(`status --porcelain`);
  return utils.toLineArray(result).length === 0;
};

/**
 * Lists all remote repositories
 */
const listRemotes = async () => {
  const remotes = await git(`remote`);
  return utils.toLineArray(remotes);
};

/**
 * Lists all remote branches matching given pattern
 */
const listRemoteBranches = async (pattern: string): Promise<string[]> => {
  const branches = await git(`branch --remotes --list "${pattern}"`);
  return utils.toLineArray(branches).filter(filterHead);
};

/**
 * Returns wether the passed ref exist or not
 */
const refExists = async (ref: string) => {
  try {
    const result = await git(`rev-parse --quiet --verify ${ref}`);
    return result.length > 0;
  } catch (e) {
    return false;
  }
};

/**
 * Removes the HEAD line when using `git branch`
 */
const filterHead = (line: string) =>
  !line.includes("HEAD") && !line.includes(" ") && !line.includes("->");

/**
 * checks if current HEAD can merge with given branch
 */
const canMerge = async (branch: string) => {
  try {
    await git(`merge --no-commit ${branch}`);
    console.log(chalk.grey(`No conflicts with `) + chalk.green(`${branch}`));
    await git(`reset --hard`);
    return true;
  } catch (e) {
    console.log(chalk.grey(`Conflicts found with `) + chalk.red(`${branch}`));
    await git(`merge --abort`);
    await git(`reset --hard`);
    return false;
  }
};

/**
 * Returns a list of remote branches using given commit (not including HEAD)
 */
const isUsedByBranches = async (commit: string): Promise<string[]> => {
  const usedByBranches = await git(
    `branch --remotes --list --contains ${commit}`
  );
  return utils.toLineArray(usedByBranches).filter(filterHead);
};

export default {
  findCommonAncestor,
  listCommits,
  getCommitMessage,
  toShortHash,
  getCommitFiles,
  getCommitDiff,
  isCleanWorkDir,
  listRemotes,
  listRemoteBranches,
  canMerge,
  isUsedByBranches,
  refExists,
  getCurrentBranch
};
