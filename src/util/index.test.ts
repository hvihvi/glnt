import util from ".";

it("toLineArray should return an array", () => {
  // given
  const str = "aze\neza\ndsa\n\ncazera";
  // when
  const array = util.toLineArray(str);
  // then
  expect(array).toEqual(["aze", "eza", "dsa", "cazera"]);
});

describe("matchesPattern", () => {
  it("should return true if contains keyword", () => {
    // given
    const msg = "bla\nb\nla #ISSUE-123 blabla";
    const keywords = ["*#ISSUE-*"];
    // when
    const result = util.matchesPattern(msg, keywords);
    // then
    expect(result).toBeTruthy();
  });

  it("should return false if contains no keyword", () => {
    // given
    const msg = "blabla ISSUE-123 blabla";
    const keywords = ["*#ISSUE-*"];
    // when
    const result = util.matchesPattern(msg, keywords);
    // then
    expect(result).toBeFalsy();
  });

  it("should return false if contains no keyword", () => {
    // given
    const msg = "blabla #ISSU-123 blabla";
    const keywords = ["*#ISSUE-*"];
    // when
    const result = util.matchesPattern(msg, keywords);
    // then
    expect(result).toBeFalsy();
  });

  it("should return true if contains one keyword", () => {
    // given
    const msg = "blabla #ISSUE-123 blabla\nblablabla";
    const keywords = ["*#ISSUE-*", "*#BUG-*"];
    // when
    const result = util.matchesPattern(msg, keywords);
    // then
    expect(result).toBeTruthy();
  });

  it("should return false if list is empty", () => {
    // given
    const msg = "blabla #ISSUE-123 blabla\nblablabla";
    const keywords = [];
    // when
    const result = util.matchesPattern(msg, keywords);
    // then
    expect(result).toBeTruthy();
  });
});
