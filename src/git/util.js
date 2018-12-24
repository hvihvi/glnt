const execSync = require("child_process").exec;
const util = require("util");

const exec = async cmd => {
  const { stdout } = await util.promisify(execSync)(cmd);
  return stdout;
};

const git = cmd => exec("git " + cmd);

/**
 * To array of lines, removes empty strings
 */
const toLineArray = str => str.split("\n").filter(s => s === "");

module.exports = {
  exec,
  git,
  toLineArray
};
