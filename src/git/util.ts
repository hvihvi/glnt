import { exec as execSync } from "child_process";
import { promisify } from "util";

const exec = async (cmd: string) => {
  const { stdout } = await promisify(execSync)(cmd);
  return stdout;
};

const git = (cmd: string) => exec("git " + cmd);

/**
 * To array of lines, removes empty strings
 */
const toLineArray = (str: string): string[] =>
  str.split("\n").filter(s => s !== "");

export default {
  exec,
  git,
  toLineArray
};
