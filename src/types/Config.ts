import { Level } from "./Level";

export interface Config {
  origin: string;
  shouldHaveTests: ShouldHaveTestsConfig;
  shouldHaveFormattedMessage: ShouldHaveFormattedMessageConfig;
  shouldHaveNoKeywordsInDiffs: KeywordsConfig;
  shouldHaveKeywordsInMessage: KeywordsConfig;
  shouldMergeWithOtherBranches: RuleConfig; // TODO => PatternConfig
}

export interface RuleConfig {
  enabled: boolean; // TODO => remove and replace with level=DISABLED
  level: string; // TODO => type as Level
}

export interface ShouldHaveTestsConfig extends RuleConfig {
  subject: string;
  test: string;
  untestedTag: string; // TODO => array for more tags
}

export interface ShouldHaveFormattedMessageConfig extends RuleConfig {
  charactersPerLine: number;
}

export interface KeywordsConfig extends RuleConfig {
  keywords: string[];
}

export interface PatternConfig extends RuleConfig {
  pattern: string;
}
