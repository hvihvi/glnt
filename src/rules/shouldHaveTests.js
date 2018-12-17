import minimatch from "minimatch";
import config from "../config";

// patches.forEach(patch =>
//   console.log(
//     `${patch.oldFile().path()} Added: ${
//       patch.lineStats().total_additions
//     } lines Deleted: ${patch.lineStats().total_deletions} lines`
//   )
// )

// Visible for testing
export const countMatchingFiles = (patches, pattern) => {
  return patches
    .map(patch => patch.oldFile().path())
    .filter(filename => minimatch(filename, pattern)).length;
};

const hasModifiedTests = patches =>
  countMatchingFiles(patches, config.shouldHaveTests.test) > 0;

const hasModifiedFiles = patches =>
  countMatchingFiles(patches, config.shouldHaveTests.subject) > 0;

const hasMissingTests = patches =>
  hasModifiedFiles(patches) && !hasModifiedTests(patches);

export default (commit, patches) => {
  // TODO pass commit, to display commit.sha()
  if (hasMissingTests(patches)) {
    console.log(
      `[Missing Test][${commit.sha()}] You modified source files without modifying a test, is a test missing?`
    );
  }
};
