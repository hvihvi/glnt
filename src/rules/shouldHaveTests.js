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

const shouldHaveTests = async commit => {
  const filenames = await git.getCommitFiles(commit);
  if (/* TODO nocommithashtag &&  */ hasMissingTests(filenames)) {
    // TODO mutualise shortHash to logger
    const shortHash = await git.toShortHash(commit);
    logger.log(
      `[${shortHash}] You modified source files without modifying a test, is a test missing?`,
      config.level
    );
  }
};

module.exports = {
  // Visible for testing
  countMatchingFiles,
  shouldHaveTests
};
