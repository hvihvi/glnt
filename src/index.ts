import rules from "./rules";

const run = () => {
  // TODO exit when git index not clean
  // TODO handle processkill for mergechecks
  process.on("SIGINT", () => console.log("handle SIGINT"));
  rules.applyRules();
};

export default {
  run
};
