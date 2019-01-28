export interface Config {
  origin: string;
  shouldHaveTests: ShouldHaveTestsConfig;
  shouldHaveNCharPerLine: CharPerLineConfig;
  shouldHaveSeparatorLine: RuleConfig;
  shouldHaveNoKeywordsInDiffs: KeywordsConfig;
  shouldHavePatternsInMessage: PatternsConfig;
  shouldMergeWithOtherBranches: RuleConfig;
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
