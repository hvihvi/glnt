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
  name: RuleName;
  desc: Desc;
  apply: Apply;
}

enum RuleName {
  N_CHAR_PER_LINE = "shouldHaveNCharPerLine",
  NO_KEYWORDS_IN_DIFF = "shouldHaveNoKeywordsInDiffs",
  PATTERN_IN_MSG = "shouldHavePatternsInMessage",
  PATTERN_IN_BRANCH = "shouldHavePatternsInBranchName",
  SEPARATOR_LINE = "shouldHaveSeparatorLine",
  STARTS_WITH_UPPERCASE = "shouldStartMessageWithUpperCase",
  TESTS = "shouldHaveTests",
  MERGE = "shouldMergeWithOtherBranches",
  NOT_USED_BY_OTHERS = "shouldNotBeUsedByOthers"
}

/**
 * description of what a rule does.
 * used by config creator prompt.
 */
enum Desc {
  N_CHAR_PER_LINE = "Checks if commit messages are wrapped to a certain amount of character per line (recommended: 72)",
  NO_KEYWORDS_IN_DIFF = "",
  PATTERN_IN_MSG = "",
  PATTERN_IN_BRANCH = "",
  SEPARATOR_LINE = "Checks if commit messages have a blank line between header and body (recommended for certain tools)",
  STARTS_WITH_UPPERCASE = "Checks if commit messages start with an uppercase",
  TESTS = "Check if commits that include code modification also include tests, or explain in commit message the reason for not having one",
  MERGE = "Check if the current branch merges with other branches that match a pattern",
  NOT_USED_BY_OTHERS = "Checks if any other remote branches use your commits (useful to check wether it's safe to use git-rebase for example)"
}

export const Rules = {
  shouldHaveNCharPerLine: {
    name: RuleName.N_CHAR_PER_LINE,
    desc: Desc.N_CHAR_PER_LINE
  },
  shouldHaveNoKeywordsInDiffs: {
    name: RuleName.NO_KEYWORDS_IN_DIFF,
    desc: Desc.NO_KEYWORDS_IN_DIFF
  },
  shouldHavePatternsInMessage: {
    name: RuleName.PATTERN_IN_MSG,
    desc: Desc.PATTERN_IN_MSG
  },
  shouldHaveSeparatorLine: {
    name: RuleName.SEPARATOR_LINE,
    desc: Desc.SEPARATOR_LINE
  },
  shouldStartMessageWithUpperCase: {
    name: RuleName.STARTS_WITH_UPPERCASE,
    desc: Desc.STARTS_WITH_UPPERCASE
  },
  shouldHaveTests: {
    name: RuleName.TESTS,
    desc: Desc.TESTS
  },
  shouldMergeWithOtherBranches: {
    name: RuleName.MERGE,
    desc: Desc.MERGE
  },
  shouldNotBeUsedByOthers: {
    name: RuleName.NOT_USED_BY_OTHERS,
    desc: Desc.NOT_USED_BY_OTHERS
  },
  shouldHavePatternsInBranchName: {
    name: RuleName.PATTERN_IN_BRANCH,
    desc: Desc.PATTERN_IN_BRANCH
  }
};
