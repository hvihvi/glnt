import git from "../git";
import { KeywordsConfig } from "../types/Config";
import { FAIL, PASS, Rule } from "../types/Rule";

// TODO rename rule to shouldHaveNoKeywordsInAddedDiffs
const name = "shouldHaveNoKeywordsInDiffs";

// Visible for testing
export const hasKeywordsInDiff = (diffs: string[], keywords: string[]) =>
  keywords.some(keyword =>
    diffs
      .filter(diff => diff.startsWith("+"))
      .some(diff => diff.includes(keyword))
  );

const apply = async (config: KeywordsConfig, commit: string) => {
  const diffs = await git.getCommitDiff(commit);
  if (hasKeywordsInDiff(diffs, config.keywords)) {
    return FAIL(
      `Diff content should not contain any of the following forbidden keywords : ${
        config.keywords
      }`
    );
  } else {
    return PASS;
  }
};

const rule: Rule = { name, apply };

export default rule;
