import logger from "../logger";
import { Config } from "../types/Config";
import { Level, toLevel } from "../types/Level";
import { PASS, Result, ResultWithLevel, Rule } from "../types/Rule";

const applyRule = (rule: Rule) => async (
  config: Config,
  ...args: any
): Promise<ResultWithLevel> => {
  const level = toLevel(config[rule.name].level);
  if (level === Level.DISABLED) {
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
    logger.logMessage(level, result.message, rule);
  }
  return { ...result, level };
};

export default { applyRule };
