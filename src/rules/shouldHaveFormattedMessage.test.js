const shouldHaveFormattedMessage = require("./shouldHaveFormattedMessage");

it("Should have line separator between header and body", () => {
  // given
  const msg = `Add something
  body here...`;
  // when
  const result = shouldHaveFormattedMessage.hasSeparatorLine(msg);
  // then
  expect(result).toBeTruthy();
});

it("Should have line separator between header and body", () => {
  // given
  const msg = `Add something

  body here...`;
  // when
  const result = shouldHaveFormattedMessage.hasSeparatorLine(msg);
  // then
  expect(result).toBeFalsy();
});

it("Should have less than 72char per lines", () => {
  // given
  const msg = `Add somethingssssssssssssssssazezeadsqsdazdsqdszasdadadadadadadadadadadadadaadadadadadadadadaezeazeazeazeazeazeazeazeaeazeazeaad`;
  // when
  const result = shouldHaveFormattedMessage.hasNCharPerLine(msg);
  // then
  expect(result).toBeTruthy();
});

it("Should have less than 72char per lines", () => {
  // given
  const msg = `Add something`;
  // when
  const result = shouldHaveFormattedMessage.hasNCharPerLine(msg);
  // then
  expect(result).toBeFalsy();
});
