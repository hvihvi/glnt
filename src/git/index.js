const Git = require("nodegit");
const util = require("./util");

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

const findCommonAncestor = async (branch1, branch2) => {
  return util.git(`merge-base ${branch1} ${branch2}`);
};

const listCommits = async (base, head) =>
  util.git(`rev-list ${base}..${head}`).then(str => util.toLineArray(str));

module.exports = {
  onEachCommit,
  onEachCommitPatches,
  findCommonAncestor,
  listCommits
};
