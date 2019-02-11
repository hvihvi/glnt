import { match } from "minimatch";

/**
 * To array of lines, removes empty strings
 */
const toLineArray = (str: string): string[] =>
  str
    .trim()
    .split("\n")
    .filter(s => s !== "")
    .map(s => s.trim());

const matchesPattern = (it: string, patterns: string[]) => {
  if (patterns.length === 0) {
    return true;
  }
  return patterns.some(pattern => match(toLineArray(it), pattern).length > 0);
};

export default { toLineArray, matchesPattern };
