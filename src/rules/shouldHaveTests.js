const git = require("../git");
const minimatch = require("minimatch");
const config = require("../config").config.shouldHaveTests;
const logger = require("../logger");

const countMatchingFiles = (filenames, pattern) => {
  return filenames.filter(filename => minimatch(filename, pattern)).length;
};

const hasModifiedTests = filenames =>
  countMatchingFiles(filenames, config.test) > 0;

const hasModifiedFiles = filenames =>
  countMatchingFiles(filenames, config.subject) > 0;

const hasMissingTests = filenames =>
  hasModifiedFiles(filenames) && !hasModifiedTests(filenames);

const hasUntestedTag = message => message.includes(config.untestedTag);

const shouldHaveTests = async commit => {
  const filenames = await git.getCommitFiles(commit);
  const message = await git.getCommitMessage(commit);
  if (hasUntestedTag(message) && hasMissingTests(filenames)) {
    logger.logWithSha1(
      `You modified source files without modifying a test, is a test missing?`,
      config.level,
      commit
    );
  }
};

module.exports = {
  // Visible for testing
  hasUntestedTag,
  // Visible for testing
  countMatchingFiles,
  shouldHaveTests
};
