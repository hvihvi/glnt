import Git from "nodegit";

export default () => {
  Git.Repository.open(".").then(repo =>
    repo.getBranch("master").then(branch => console.log(branch.name()))
  );
};
