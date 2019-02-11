import { hasNoSeparatorLine } from "./shouldHaveSeparatorLine";

it("Should have line separator between header and body", () => {
  // given
  const msg = `Add something
  body here...`;
  // when
  const result = hasNoSeparatorLine(msg);
  // then
  expect(result).toBeTruthy();
});

it("Should have line separator between header and body", () => {
  // given
  const msg = `Add something

  body here...`;
  // when
  const result = hasNoSeparatorLine(msg);
  // then
  expect(result).toBeFalsy();
});
