import chalk from "chalk";
import git from "../git";
import { Level, toLevel } from "../types/Level";

const log = (message: string, level: string) => {
  switch (toLevel(level)) {
    case Level.ERROR:
      error(message);
      break;
    case Level.INFO:
    default:
      info(message);
    case Level.DISABLED:
      return;
  }
};

/**
 * Amends the given commit sha1 to the log message
 */
const logWithSha1 = async (message, level, commit) => {
  const shortHash = await git.toShortHash(commit);
  log(`[${shortHash}] ` + message, level);
};

const info = message => {
  console.log(chalk.yellow("[INFO] ") + chalk.grey(message));
};

const error = message => {
  console.log(chalk.red("[ERROR] ") + message);
};

export default {
  log,
  logWithSha1
};
