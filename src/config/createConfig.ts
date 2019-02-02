import { prompts } from "prompts";
import { Config } from "../types/Config";
import defaultConfig from "./defaultConfig";

const run = async () => {
  const response = await prompts.confirm({
    type: "confirm",
    name: "value",
    message: "Would you like to create a configuration file?",
    initial: true
  });
  console.log(response);
  const config: Config = { ...defaultConfig };
  return false;
};

export default { run };
