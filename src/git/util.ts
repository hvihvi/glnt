import { exec as execSync } from "child_process";
import { promisify } from "util";

const exec = async (cmd: string) => {
  const { stdout } = await promisify(execSync)(cmd);
  return stdout;
};

export const git = (cmd: string) => exec("git " + cmd);

export default {
  exec,
  git
};
