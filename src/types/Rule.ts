import { Level } from "./Level";

export type Apply = (...args: any[]) => Promise<Result>;

export interface Result {
  pass: boolean;
  message?: string;
}

export interface ResultWithLevel extends Result {
  level?: Level;
}

export const PASS: Result = { pass: true };

export const FAIL = (message: string): Result => {
  return { pass: false, message };
};

export interface Rule {
  name: string;
  apply: Apply;
}

export enum RuleName {
  N_CHAR_PER_LINE = "shouldHaveNCharPerLine",
  NO_KEYWORDS_IN_DIFF = "shouldHaveNoKeywordsInDiffs",
  PATTERN_IN_MSG = "shouldHavePatternsInMessage",
  SEPARATOR_LINE = "shouldHaveSeparatorLine",
  STARTS_WITH_UPPERCASE = "shouldStartMessageWithUpperCase",
  TESTS = "shouldHaveTests",
  MERGE = "shouldMergeWithOtherBranches",
  NOT_USED_BY_OTHERS = "shouldNotBeUsedByOthers"
}
