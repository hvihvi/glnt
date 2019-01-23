import logger from "../logger";
import { Level } from "../types/Level";
import { Result, Rule } from "../types/Rule";

const applyRule = (rule: Rule) => (args: any) => {
  if (rule.level === Level.DISABLED) {
    return;
  }
  const result: Result = rule.apply(args);
  if (result.pass) {
    logger.logMessage(result.message);
  }
};
