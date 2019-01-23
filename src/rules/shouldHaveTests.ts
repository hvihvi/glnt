import minimatch = require("minimatch");
import config from "../config";
import git from "../git";
import logger from "../logger";
import { toLevel } from "../types/Level";

// Visible for testing
export const countMatchingFiles = (filenames: string[], pattern: string) => {
  return filenames.filter(filename => minimatch(filename, pattern)).length;
};

const hasModifiedTests = filenames =>
  countMatchingFiles(filenames, config.shouldHaveTests.test) > 0;

const hasModifiedFiles = filenames =>
  countMatchingFiles(filenames, config.shouldHaveTests.subject) > 0;

const hasMissingTests = filenames =>
  hasModifiedFiles(filenames) && !hasModifiedTests(filenames);

// Visible for testing
export const hasUntestedTag = message =>
  message.includes(config.shouldHaveTests.untestedTag);

const apply = async (commit: string) => {
  const filenames = await git.getCommitFiles(commit);
  const message = await git.getCommitMessage(commit);
  if (!hasUntestedTag(message) && hasMissingTests(filenames)) {
    logger.logWithSha1(
      `You modified source files without modifying a test. Is this code not tested?
Note: You can use "${
        config.shouldHaveTests.untestedTag
      }" in the commit message to bypass this rule`,
      toLevel(config.shouldHaveTests.level), // TODO remove toLevel and have conf level as Level
      commit
    );
  }
};

export default { apply };
