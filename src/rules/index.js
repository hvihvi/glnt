import { onHeadCommitPatches, onHeadCommit } from "../git/index";
import config from "../config/index";
import shouldHaveTests from "./shouldHaveTests";
import shouldHaveFormattedMessage from "./shouldHaveFormattedMessage";

const applyRules = () => {
  console.log("[DEBUG] Applying rules");
  if (config.shouldHaveTests.enabled) {
    onHeadCommitPatches(shouldHaveTests);
  }
  if (config.shouldHaveFormattedMessage.enabled) {
    onHeadCommit(shouldHaveFormattedMessage);
  }
};

export default applyRules;
