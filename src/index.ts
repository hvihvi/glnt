import rules from "./rules";

/**
 * This export allows usage from ../bin/gint.js
 * which uses the JS compiled via typescript in ../built
 */
export const run = () => {
  // TODO handle processkill for mergechecks
  process.on("SIGINT", () => console.log("handle SIGINT"));
  rules.applyRules();
};
