import minimatch = require("minimatch");
import git from "../git";
import { ShouldHaveTestsConfig } from "../types/Config";
import { FAIL, PASS, Rule, RuleName } from "../types/Rule";

// Visible for testing
export const countMatchingFiles = (filenames: string[], pattern: string) => {
  return filenames.filter(filename => minimatch(filename, pattern)).length;
};

const hasModifiedTests = (filenames: string[], test: string) =>
  countMatchingFiles(filenames, test) > 0;

const hasModifiedFiles = (filenames: string[], subject: string) =>
  countMatchingFiles(filenames, subject) > 0;

const hasMissingTests = (filenames: string[], config: ShouldHaveTestsConfig) =>
  hasModifiedFiles(filenames, config.test) &&
  !hasModifiedTests(filenames, config.subject);

// Visible for testing
export const hasSkipTag = (message: string, skipTags: string[]): boolean =>
  skipTags.some(tag => message.includes(tag));

const apply = async (config: ShouldHaveTestsConfig, commit: string) => {
  const filenames = await git.getCommitFiles(commit);
  const message = await git.getCommitMessage(commit);
  if (
    !hasSkipTag(message, config.skipTags) &&
    hasMissingTests(filenames, config)
  ) {
    return FAIL(`You modified source files without modifying a test. Is a test missing?
        Note: Tag your commit message with [${
          config.skipTags
        }] to bypass this rule`);
  } else {
    return PASS;
  }
};

const rule: Rule = { name: RuleName.TESTS, apply };

export default rule;
