import git from "../git";
import { CharPerLineConfig } from "../types/Config";
import { Rule } from "../types/Rule";

const name = "shouldHaveNCharPerLine";

// Visible for testing
export const hasMoreThanNCharPerLine = (
  msg: string,
  charactersPerLine: number
) => {
  const lines = msg.split("\n");
  return lines.some(line => line.length > charactersPerLine);
};

const apply = async (config: CharPerLineConfig, commit: string) => {
  const msg = await git.getCommitMessage(commit);
  if (hasMoreThanNCharPerLine(msg, config.charactersPerLine)) {
    return {
      pass: false,
      message: {
        content: `Commit message should be wrapped to ${
          config.charactersPerLine
        }char per lines`,
        commit
      }
    };
  } else {
    return { pass: true };
  }
};
const rule: Rule = { name, apply };

export default rule;
