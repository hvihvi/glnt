import findProjectRoot = require("find-project-root");
import { existsSync, readFileSync } from "fs";
import logger from "../logger";
import { Config } from "../types/Config";
import createConfig from "./createConfig";
import defaultConfig from "./defaultConfig";

const CONF_FILE_NAME = ".glntrc.json";

const loadConfig = async (): Promise<Config> => {
  const projectRoot = findProjectRoot(process.cwd());
  const filename = projectRoot + "/" + CONF_FILE_NAME;
  // if config file is missing,  prompt to create one
  if (!existsSync(filename)) {
    logger.logMissingConfig();
    const created = await createConfig.run();
    if (!created) {
      process.exit(1);
    }
  }
  const loadedConfig = JSON.parse(readFileSync(filename, "utf8"));
  return { ...defaultConfig, ...loadedConfig };
};

export default { loadConfig };
