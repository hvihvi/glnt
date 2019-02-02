export interface Config {
  origin: string;
  shouldHaveTests: ShouldHaveTestsConfig;
  shouldHaveNCharPerLine: CharPerLineConfig;
  shouldHaveSeparatorLine: RuleConfig;
  shouldHaveNoKeywordsInDiffs: KeywordsConfig;
  shouldHavePatternsInMessage: PatternsConfig;
  shouldMergeWithOtherBranches: PatternConfig;
  shouldNotBeUsedByOthers: IgnoresConfig;
}

export interface RuleConfig {
  level: string;
}

export interface ShouldHaveTestsConfig extends RuleConfig {
  subject: string;
  test: string;
  skipTags: string[];
}

export interface CharPerLineConfig extends RuleConfig {
  charactersPerLine: number;
}

export interface KeywordsConfig extends RuleConfig {
  keywords: string[];
}

export interface PatternsConfig extends RuleConfig {
  patterns: string[];
}

export interface IgnoresConfig extends RuleConfig {
  ignores: string[];
}

export interface PatternConfig extends RuleConfig {
  pattern: string;
}
