const execSync = require("child_process").exec;
const util = require("util");

const exec = async cmd => {
  const { stdout } = await util.promisify(execSync)(cmd);
  return stdout;
};

/**
 * To array of lines, removes empty strings
 */
const toLineArray = str => str.split("\n").filter(s => s !== "");

module.exports = {
  exec,
  toLineArray
};
