const chalk = require("chalk");

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

const info = message => {
  console.log(chalk.yellow("[INFO] ") + chalk.grey(message));
};

const error = message => {
  console.log(chalk.red("[ERROR] ") + message);
};

module.exports = {
  log
};
