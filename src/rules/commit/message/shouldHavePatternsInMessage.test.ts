import { messageMatchesPattern } from "./shouldHavePatternsInMessage";

it("should return true if contains keyword", () => {
  // given
  const msg = "bla\nb\nla #ISSUE-123 blabla";
  const keywords = ["*#ISSUE-*"];
  // when
  const result = messageMatchesPattern(msg, keywords);
  // then
  expect(result).toBeTruthy();
});

it("should return false if contains no keyword", () => {
  // given
  const msg = "blabla ISSUE-123 blabla";
  const keywords = ["*#ISSUE-*"];
  // when
  const result = messageMatchesPattern(msg, keywords);
  // then
  expect(result).toBeFalsy();
});

it("should return false if contains no keyword", () => {
  // given
  const msg = "blabla #ISSU-123 blabla";
  const keywords = ["*#ISSUE-*"];
  // when
  const result = messageMatchesPattern(msg, keywords);
  // then
  expect(result).toBeFalsy();
});

it("should return true if contains one keyword", () => {
  // given
  const msg = "blabla #ISSUE-123 blabla\nblablabla";
  const keywords = ["*#ISSUE-*", "*#BUG-*"];
  // when
  const result = messageMatchesPattern(msg, keywords);
  // then
  expect(result).toBeTruthy();
});

it("should return false if list is empty", () => {
  // given
  const msg = "blabla #ISSUE-123 blabla\nblablabla";
  const keywords = [];
  // when
  const result = messageMatchesPattern(msg, keywords);
  // then
  expect(result).toBeTruthy();
});
