import minimatch = require("minimatch");
import config from "../config";
import git from "../git";
import logger from "../logger";
import { toLevel } from "../types/Level";
import { Result, Rule } from "../types/Rule";

const name = "shouldHaveTests";
const level = toLevel(config.shouldHaveTests.level);

// Visible for testing
export const countMatchingFiles = (filenames: string[], pattern: string) => {
  return filenames.filter(filename => minimatch(filename, pattern)).length;
};

const hasModifiedTests = (filenames: string[]) =>
  countMatchingFiles(filenames, config.shouldHaveTests.test) > 0;

const hasModifiedFiles = (filenames: string[]) =>
  countMatchingFiles(filenames, config.shouldHaveTests.subject) > 0;

const hasMissingTests = (filenames: string[]) =>
  hasModifiedFiles(filenames) && !hasModifiedTests(filenames);

// Visible for testing
export const hasSkipTag = (message: string): boolean =>
  config.shouldHaveTests.skipTags.some(tag => message.includes(tag));

const apply = async (commit: string) => {
  const filenames = await git.getCommitFiles(commit);
  const message = await git.getCommitMessage(commit);
  if (!hasSkipTag(message) && hasMissingTests(filenames)) {
    return {
      pass: false,
      message: {
        content: `You modified source files without modifying a test. Is a test missing? ಠ_ರೃ
        Note: Tag your commit message with [${
          config.shouldHaveTests.skipTags
        }] to bypass this rule`,
        level,
        commit
      }
    };
  } else {
    return { pass: true };
  }
};

const rule: Rule = { name, apply, level };

export default rule;
