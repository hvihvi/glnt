import logger from "../logger";
import { Level } from "../types/Level";
import { Result, Rule } from "../types/Rule";

const applyRule = (rule: Rule) => async (...args: any) => {
  if (rule.level === Level.DISABLED) {
    return;
  }
  const result: Result = await rule.apply(args);
  if (!result.pass) {
    logger.logMessage(result.message);
  }
};

export default { applyRule };
