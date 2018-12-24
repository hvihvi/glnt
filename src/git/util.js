const execSync = require("child_process").exec;
const util = require("util");

const exec = async cmd => {
  const { stdout } = await util.promisify(execSync)(cmd);
  return stdout;
};

module.exports = {
  exec
};
