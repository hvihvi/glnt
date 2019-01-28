/**
 * To array of lines, removes empty strings
 */
const toLineArray = (str: string): string[] =>
  str
    .trim()
    .split("\n")
    .filter(s => s !== "")
    .map(s => s.trim());

export default { toLineArray };
