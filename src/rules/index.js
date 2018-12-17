import { onEachCommit, onEachCommitPatches } from "../git/index";
import config from "../config/index";
import shouldHaveTests from "./shouldHaveTests";
import shouldHaveFormattedMessage from "./shouldHaveFormattedMessage";

const applyRules = () => {
  console.log("[DEBUG] Applying rules");
  if (config.shouldHaveTests.enabled) {
    onEachCommitPatches(shouldHaveTests);
  }
  if (config.shouldHaveFormattedMessage.enabled) {
    onEachCommit(shouldHaveFormattedMessage);
  }
};

export default applyRules;
