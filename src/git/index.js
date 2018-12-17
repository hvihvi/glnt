import Git from "nodegit";

export const onHeadCommit = callback => {
  Git.Repository.open(".")
    .then(repo => repo.getHeadCommit())
    .then(commit => {
      callback(commit);
    });
};

export const onHeadCommitPatches = callback => {
  Git.Repository.open(".")
    .then(repo => repo.getHeadCommit())
    .then(commit =>
      commit.getDiff().done(function(diffList) {
        diffList.forEach(diff =>
          diff.patches().then(patches => callback(patches))
        );
      })
    );
};
