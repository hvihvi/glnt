import logger from "../logger";
import { Config } from "../types/Config";
import { Level } from "../types/Level";
import { PASS, Result, Rule } from "../types/Rule";

const applyRule = (rule: Rule) => async (
  config: Config,
  ...args: any
): Promise<Result> => {
  if (config[rule.name].level === Level.DISABLED) {
    // rule is disabled or doesn't exist, don't run the rule
    return PASS;
  }

  // run the rule (with its dedicated config)
  const result: Result = await rule.apply(config[rule.name], ...args);

  if (!result) {
    // the rule didn't return any result, no results means no failure
    return PASS;
  }
  if (!result.pass) {
    logger.logMessage(result.message.level, result.message, rule);
  }
  return result;
};

export default { applyRule };
