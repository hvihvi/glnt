import logger from "../logger";
import { Level } from "../types/Level";
import { Result, Rule } from "../types/Rule";

const applyRule = (rule: Rule) => async (...args: any) => {
  if (rule.level === Level.DISABLED) {
    // rule is disabled, don't run the rule
    return;
  }
  const result: Result = await rule.apply(args);
  if (!result) {
    // the rule didn't return any result, no results means no failure
    return;
  }
  if (!result.pass) {
    logger.logMessage(result.message);
  }
};

export default { applyRule };
