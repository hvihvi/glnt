const { isBadMessage } = require("./shouldHaveFormattedMessage");

it("Should have line separator between header and body", () => {
  // given
  const msg = `Add something
  body here...`;
  // when
  const result = isBadMessage(msg);
  // then
  expect(result).toBeTruthy();
});
