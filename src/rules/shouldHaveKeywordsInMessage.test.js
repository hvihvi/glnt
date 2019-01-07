const hasKeywordInMessage = require("./shouldHaveKeywordsInMessage")
  .hasKeywordInMessage;

it("should return true if contains keyword", () => {
  // given
  const msg = "blabla #ISSUE-123 blabla";
  const keywords = ["#ISSUE-"];
  // when
  const result = hasKeywordInMessage(msg, keywords);
  // then
  expect(result).toBeTruthy();
});

it("should return false if contains no keyword", () => {
  // given
  const msg = "blabla ISSUE-123 blabla";
  const keywords = ["#ISSUE-"];
  // when
  const result = hasKeywordInMessage(msg, keywords);
  // then
  expect(result).toBeFalsy();
});

it("should return false if contains no keyword", () => {
  // given
  const msg = "blabla #ISSU-123 blabla";
  const keywords = ["#ISSUE-"];
  // when
  const result = hasKeywordInMessage(msg, keywords);
  // then
  expect(result).toBeFalsy();
});
