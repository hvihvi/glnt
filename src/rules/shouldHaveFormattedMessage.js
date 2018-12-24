const git = require("../git");

const isBadMessage = msg => {
  // TODO
  return true;
};

const shouldHaveFormattedMessage = async commit => {
  const msg = await git.getCommitMessage(commit);
  if (isBadMessage(msg)) {
    console.log(`[${commit}] Should have formatted message : ${msg}`);
  }
};

module.exports = {
  // Visible for testing
  isBadMessage,
  shouldHaveFormattedMessage
};
