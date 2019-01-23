import chalk from "chalk";
import git from "../git";
import { Level } from "../types/Level";
import { Message } from "../types/Message";

const log = (message: string, level: Level) => {
  switch (level) {
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

// TODO rename as log, and hide old log as implementation detail
const logMessage = (message: Message) => {
  if (message.commit) {
    logWithSha1(message.content, message.level, message.commit);
  } else {
    // TODO fix toString followed by toLevel...
    log(message.content, message.level);
  }
};

/**
 * Amends the given commit sha1 to the log message
 */
const logWithSha1 = async (message: string, level: Level, commit: string) => {
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
  logWithSha1,
  logMessage
};
