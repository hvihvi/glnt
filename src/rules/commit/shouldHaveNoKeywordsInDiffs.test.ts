import { hasKeywordsInDiff } from "./shouldHaveNoKeywordsInDiffs";

it("should return true if contains keyword", () => {
  // given
  const diffs = ["// code here", "+ // TODO something"];

  // when
  const containsAny = hasKeywordsInDiff(diffs, ["TODO"]);

  // then
  expect(containsAny).toBeTruthy();
});

it("should return false if not contains keyword", () => {
  // given
  const diffs = ["+ // something", "// something"];

  // when
  const containsAny = hasKeywordsInDiff(diffs, ["TODO"]);

  // then
  expect(containsAny).toBeFalsy();
});

it("should return false if contains keyword not in an added line", () => {
  // given
  const diffs = ["// TODO something"];

  // when
  const containsAny = hasKeywordsInDiff(diffs, ["TODO"]);

  // then
  expect(containsAny).toBeFalsy();
});
