const hasKeywordsInDiff = require("./shouldHaveNoKeywordsInDiffs")
  .hasKeywordsInDiff;

it("should return true if contains keyword", () => {
  // given
  const diffs = ["// code here", "+ // TODO something"];

  // when
  const containsAny = hasKeywordsInDiff(diffs);

  // then
  expect(containsAny).toBeTruthy();
});

it("should return false if not contains keyword", () => {
  // given
  const diffs = ["+ // something", "// something"];

  // when
  const containsAny = hasKeywordsInDiff(diffs);

  // then
  expect(containsAny).toBeFalsy();
});

it("should return false if contains keyword not in an added line", () => {
  // given
  const diffs = ["// TODO something"];

  // when
  const containsAny = hasKeywordsInDiff(diffs);

  // then
  expect(containsAny).toBeFalsy();
});
