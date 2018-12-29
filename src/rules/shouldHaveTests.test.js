const { countMatchingFiles } = require("./shouldHaveTests");

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
