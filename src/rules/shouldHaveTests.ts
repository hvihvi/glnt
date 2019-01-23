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
export const hasUntestedTag = message =>
  message.includes(config.shouldHaveTests.untestedTag);

const apply = async (commit: string) => {
  const filenames = await git.getCommitFiles(commit);
  const message = await git.getCommitMessage(commit);
  if (!hasUntestedTag(message) && hasMissingTests(filenames)) {
    return {
      pass: false,
      message: {
        content: `You modified source files without modifying a test. Is this code not tested?
        Note: You can use "${
          config.shouldHaveTests.untestedTag
        }" in the commit message to bypass this rule`,
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
