const isBadMessage = message => {
  console.log(message.split[1]);
  // TODO
  return true;
};

const shouldHaveFormattedMessage = commit => {
  if (isBadMessage(commit.message())) {
    console.log(`[Bad Message][${commit.sha()}] Please rewrite commit message`);
  }
};

module.exports = {
  // Visible for testing
  isBadMessage,
  shouldHaveFormattedMessage
};
