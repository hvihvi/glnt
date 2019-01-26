import logger from "../logger";
import { Level } from "../types/Level";
import { Result, Rule } from "../types/Rule";

const applyRule = (rule: Rule) => async (...args: any): Promise<Result> => {
  if (rule.level === Level.DISABLED) {
    // rule is disabled, don't run the rule
    return { pass: true };
  }
  const result: Result = await rule.apply(args);
  if (!result) {
    // the rule didn't return any result, no results means no failure
    return { pass: true };
  }
  if (!result.pass) {
    logger.logMessage(result.message, rule);
  }
  return result;
};

export default { applyRule };
