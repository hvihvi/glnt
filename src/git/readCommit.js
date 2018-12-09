import Git from "nodegit";
import shouldHaveTests from "../rules/shouldHaveTests";

const getCommitDiff = commit =>
  commit.getDiff().done(function(diffList) {
    diffList.forEach(diff =>
      diff.patches().then(patches => shouldHaveTests(patches))
    );
  });

const readCommit = () => {
  Git.Repository.open(".")
    .then(repo => repo.getHeadCommit())
    .then(getCommitDiff);
};

export default readCommit;
