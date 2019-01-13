import chalk from "chalk";
import git from "../git";

const log = (message, level) => {
  switch (level) {
    case "ERROR":
      error(message);
      break;
    case "INFO":
    default:
      info(message);
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
