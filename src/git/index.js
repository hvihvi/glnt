const Git = require("nodegit");

const onEachCommit = callback => {
  Git.Repository.open(".")
    .then(repo => repo.getHeadCommit())
    .then(headCommit => {
      headCommit
        .history(Git.Revwalk.SORT.TIME)
        .on("commit", commit => callback(commit))
        .start();
    })
    .done();
};

const onEachCommitPatches = callback => {
  onEachCommit(commit =>
    commit.getDiff().done(function(diffList) {
      diffList.forEach(diff =>
        diff.patches().then(patches => callback(commit, patches))
      );
    })
  );
};

module.exports = {
  onEachCommit,
  onEachCommitPatches
};
