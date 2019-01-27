export interface Config {
  origin: string;
  shouldHaveTests: ShouldHaveTestsConfig;
  shouldHaveNCharPerLine: CharPerLineConfig;
  shouldHaveSeparatorLine: RuleConfig;
  shouldHaveNoKeywordsInDiffs: KeywordsConfig;
  shouldHaveKeywordsInMessage: KeywordsConfig;
  shouldMergeWithOtherBranches: RuleConfig; // TODO => PatternConfig
}

export interface RuleConfig {
  level: string;
}

export interface ShouldHaveTestsConfig extends RuleConfig {
  subject: string;
  test: string;
  untestedTag: string; // TODO => array for more tags
}

export interface CharPerLineConfig extends RuleConfig {
  charactersPerLine: number;
}

export interface KeywordsConfig extends RuleConfig {
  keywords: string[];
}

export interface PatternConfig extends RuleConfig {
  pattern: string;
}
