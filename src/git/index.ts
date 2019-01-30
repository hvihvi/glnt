import chalk from "chalk";
import utils from "../util";
import { git } from "./util";

const findCommonAncestor = async (branch1, branch2) => {
  return git(`merge-base ${branch1} ${branch2}`).then(sha1 => sha1.trim());
};

/**
 * Returns an array of strings, their value is the full sha1 of commits reachable from head not in base
 */
const listCommits = async (base, head) =>
  git(`rev-list ${base}..${head}`)
    .then(result => result.trim())
    .then(str => utils.toLineArray(str));

const getCommitMessage = sha1 =>
  git(`show -s --format=%B ${sha1}`).then(msg => msg.trim());

const toShortHash = sha1 =>
  git(`rev-parse --short ${sha1}`).then(result => result.trim());

/**
 * Returns an array of strings, their value is the path to modified filenames in given commit
 */
const getCommitFiles = sha1 =>
  git(`diff-tree --no-commit-id --name-only -r ${sha1}`)
    .then(result => result.trim())
    .then(str => utils.toLineArray(str));

/**
 * Returns a string containing the diff patch of the commit
 */
const getCommitDiff = sha1 =>
  git(`diff-tree -p ${sha1}`)
    .then(result => result.trim())
    .then(str => utils.toLineArray(str));

/**
 * Returns wether the working directory is clean or not
 */
const isCleanWorkDir = async () => {
  const result = await git(`status --porcelain`);
  return utils.toLineArray(result.trim()).length === 0;
};

/**
 * Lists all remote repositories
 */
const listRemotes = async () => {
  const remotes = await git(`remote`);
  return utils.toLineArray(remotes.trim());
};

/**
 * Lists all remote branches matching given pattern
 */
const listRemoteBranches = async (pattern: string): Promise<string[]> => {
  const branches = await git(`branch --remotes --list "${pattern}"`);
  return utils.toLineArray(branches).filter(
    line =>
      !line.includes("HEAD") && !line.includes(" ") && !line.includes("->") // removes the HEAD line
  );
};

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
  canMerge
};
