// Visible for testing
export const isBadMessage = message => {
  console.log(message.split[1]);
  // TODO
  return true;
};

export default commit => {
  if (isBadMessage(commit.message())) {
    console.log(`[Bad Message][${commit.sha()}] Please rewrite commit message`);
  }
};
