import chalk from "chalk";
import git from "../git";
import { Level } from "../types/Level";
import { Rule } from "../types/Rule";

const log = (message: string, level: Level, name: string) => {
  switch (level) {
    case Level.ERROR:
      error(message, name);
      break;
    case Level.INFO:
    default:
      info(message, name);
    case Level.DISABLED:
      return;
  }
};

// TODO rename as log, and hide old log as implementation detail
const logMessage = (
  level: Level,
  message: string,
  rule: Rule,
  commit?: string
) => {
  if (commit) {
    logWithSha1(message, level, rule.name, commit);
  } else {
    // TODO fix toString followed by toLevel...
    log(message, level, rule.name);
  }
};

/**
 * Amends the given commit sha1 to the log message
 */
const logWithSha1 = async (
  message: string,
  level: Level,
  name: string,
  commit: string
) => {
  const shortHash = await git.toShortHash(commit);
  log(message, level, chalk.cyan(shortHash) + " " + name);
};

const info = (message, name) => {
  console.log(
    chalk.yellow(" info  ") +
      chalk.grey(name) +
      "\n         " +
      chalk.grey(message)
  );
};

const error = (message, name) => {
  console.log(
    chalk.red(" error ") + chalk.bold(name) + "\n         " + message
  );
};

/**
 * Message printed when all rules pass
 */
const success = () =>
  console.log(chalk.green("\nSuccess! All git rules pass!\n"));

/**
 * Message printed when at least one rule doesn't pass
 */
const fail = () => console.log(chalk.red("\nFail! Please fix errors above\n"));

const logMissingMaster = (ref: string) => {
  console.log(
    chalk.redBright(`The branch `) +
      chalk.redBright.underline.bold(ref) +
      chalk.redBright(
        ` doesn't exist.\nPlease use a valid branch name in your configuration file.`
      )
  );
};

export default {
  logMessage,
  success,
  fail,
  info,
  error,
  logMissingMaster
};
