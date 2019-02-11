import { countMatchingFiles, hasSkipTag } from "./shouldHaveTests";

it("should count matched patterns", () => {
  // given
  const filenames = [
    "src/something.js",
    "src/something.test.js",
    "src/something/else/test.js"
  ];

  // when
  const count = countMatchingFiles(filenames, "**/*.js");
  // then
  expect(count).toEqual(3);
});

it("should return true when has untested tag", () => {
  // given
  const message = `I'm a commit header
  
  #untested : this commit is not tested but there is a reason
  `;

  // when
  const result = hasSkipTag(message, ["#untested"]);

  // then
  expect(result).toBeTruthy();
});

it("should return false when has no untested tag", () => {
  // given
  const message = `I'm a commit header
  
  this commit is not tested but has no tag
  `;

  // when
  const result = hasSkipTag(message, ["#untested"]);

  // then
  expect(result).toBeFalsy();
});
