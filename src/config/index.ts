import findProjectRoot = require("find-project-root");
import { existsSync, readFileSync, writeFileSync } from "fs";
import { Config } from "../types/Config";
import createConfig from "./createConfig";
import defaultConfig from "./defaultConfig";
import chalk from "chalk";

const CONF_FILE_NAME = ".glntrc.json";

const loadConfig = async (): Promise<Config> => {
  const projectRoot = findProjectRoot(process.cwd());
  const filename = projectRoot + "/" + CONF_FILE_NAME;
  // if config file is missing, prompt to create one
  if (!existsSync(filename)) {
    const createdConfig = await createConfig.run();
    writeFileSync(filename, JSON.stringify(createdConfig));
    console.log(chalk.green("\nconfig file created at " + filename));
    process.exit(0);
  }
  const loadedConfig = JSON.parse(readFileSync(filename, "utf8"));
  return { ...defaultConfig, ...loadedConfig };
};

export default { loadConfig };
