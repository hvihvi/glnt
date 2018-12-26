const minimatch = require("minimatch");
const config = require("../config").config.shouldHaveTests;
const logger = require("../logger");

// patches.forEach(patch =>
//   console.log(
//     `${patch.oldFile().path()} Added: ${
//       patch.lineStats().total_additions
//     } lines Deleted: ${patch.lineStats().total_deletions} lines`
//   )
// )

const countMatchingFiles = (patches, pattern) => {
  return patches
    .map(patch => patch.oldFile().path())
    .filter(filename => minimatch(filename, pattern)).length;
};

const hasModifiedTests = patches =>
  countMatchingFiles(patches, config.test) > 0;

const hasModifiedFiles = patches =>
  countMatchingFiles(patches, config.subject) > 0;

const hasMissingTests = patches =>
  hasModifiedFiles(patches) && !hasModifiedTests(patches);

const shouldHaveTests = (commit, patches) => {
  // TODO pass commit, to display commit.sha()
  if (hasMissingTests(patches)) {
    logger.log(
      `[Missing Test][${commit.sha()}] You modified source files without modifying a test, is a test missing?`,
      config.level
    );
  }
};

module.exports = {
  // Visible for testing
  countMatchingFiles,
  shouldHaveTests
};
