import config from "../config/index";
import git from "../git/index";
import logger from "../logger";
import { Result } from "../types/Rule";
import shouldHaveKeywordsInMessage from "./shouldHaveKeywordsInMessage";
import shouldHaveFormattedMessage from "./shouldHaveNCharPerLine";
import shouldHaveNoKeywordsInDiffs from "./shouldHaveNoKeywordsInDiffs";
import shouldHaveSeparatorLine from "./shouldHaveSeparatorLine";
import shouldHaveTests from "./shouldHaveTests";
import shouldMergeWithOtherBranches from "./shouldMergeWithOtherBranches";
import util from "./util";

const applyRules = async () => {
  const base = await git.findCommonAncestor("HEAD", config.origin);
  const commits = await git.listCommits(base, "HEAD");

  // collect per commit rules
  const commitResults: Result[] = await Promise.all(
    commits.map(commit => applyCommitRules(commit))
  ).then(array => [].concat.apply([], array)); // Equivalent to array.flat TODO util func
  // collect HEAD rules
  const headResults: Result[] = await applyHeadRules();

  // merge all results
  const results = [...commitResults, ...headResults];

  // exit process with 1 if any rule don't pass, 0 otherwise
  const exitCode = results.some(result => !result.pass) ? 1 : 0;
  exitCode ? logger.fail() : logger.success();
  process.exit(exitCode);
};

/**
 * Add rules that apply to commits here
 * @param commit (string)
 */
const applyCommitRules = async (commit: string): Promise<Result[]> => {
  return Promise.all([
    util.applyRule(shouldHaveFormattedMessage)(commit),
    util.applyRule(shouldHaveTests)(commit),
    util.applyRule(shouldHaveNoKeywordsInDiffs)(commit),
    util.applyRule(shouldHaveKeywordsInMessage)(commit),
    util.applyRule(shouldHaveSeparatorLine)(commit)
  ]);
};

/**
 * Add rules that apply to HEAD here
 */
const applyHeadRules = async (): Promise<Result[]> => {
  return Promise.all([util.applyRule(shouldMergeWithOtherBranches)()]);
};

export default { applyRules };
