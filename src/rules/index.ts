import cfg from "../config";
import git from "../git";
import logger from "../logger";
import { Config } from "../types/Config";
import { Level } from "../types/Level";
import { Result, ResultWithLevel } from "../types/Rule";
import shouldHaveNCharPerLine from "./shouldHaveNCharPerLine";
import shouldHaveNoKeywordsInDiffs from "./shouldHaveNoKeywordsInDiffs";
import shouldHavePatternsInMessage from "./shouldHavePatternsInMessage";
import shouldHaveSeparatorLine from "./shouldHaveSeparatorLine";
import shouldHaveTests from "./shouldHaveTests";
import shouldMergeWithOtherBranches from "./shouldMergeWithOtherBranches";
import shouldNotBeUsedByOthers from "./shouldNotBeUsedByOthers";
import util from "./util";

const applyRules = async () => {
  const config = await cfg.loadConfig();
  // exit if origin branch doesn't exist
  const masterExists = await git.refExists(config.origin);
  if (!masterExists) {
    logger.logMissingMaster(config.origin);
    process.exit(1);
  }
  const base = await git.findCommonAncestor("HEAD", config.origin);
  const commits = await git.listCommits(base, "HEAD");

  // collect per commit rules
  const commitResults: ResultWithLevel[] = await Promise.all(
    commits.map(commit => applyCommitRules(commit, config))
  ).then(array => [].concat.apply([], array)); // Equivalent to array.flat TODO util func
  // collect HEAD rules
  const headResults: ResultWithLevel[] = await applyHeadRules(config);

  // merge all results
  const results = [...commitResults, ...headResults];

  // exit process with 1 if any rule maked as ERROR don't pass, 0 otherwise
  const exitCode = results.some(
    result => !result.pass && result.level === Level.ERROR
  );
  exitCode ? logger.fail() : logger.success();
  process.exit(exitCode ? 1 : 0);
};

/**
 * Add rules that apply to commits here
 * @param commit (string)
 */
const applyCommitRules = async (
  commit: string,
  config: Config
): Promise<Result[]> => {
  return Promise.all([
    util.applyRule(shouldHaveNCharPerLine)(config, commit),
    util.applyRule(shouldHaveTests)(config, commit),
    util.applyRule(shouldHaveNoKeywordsInDiffs)(config, commit),
    util.applyRule(shouldHavePatternsInMessage)(config, commit),
    util.applyRule(shouldHaveSeparatorLine)(config, commit),
    util.applyRule(shouldNotBeUsedByOthers)(config, commit)
  ]);
};

/**
 * Add rules that apply to HEAD here
 */
const applyHeadRules = async (config: Config): Promise<Result[]> => {
  return Promise.all([util.applyRule(shouldMergeWithOtherBranches)(config)]);
};

export default { applyRules };
