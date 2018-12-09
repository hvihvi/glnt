import { countMatchingFiles } from "./shouldHaveTests";

it("should count matched patterns", () => {
  // given
  const patches = [
    {
      oldFile: () => {
        return {
          path: () => "myTest.js"
        };
      }
    },
    {
      oldFile: () => {
        return {
          path: () => "my2ndTest.js"
        };
      }
    },
    {
      oldFile: () => {
        return {
          path: () => "my3rdTest/aze.js"
        };
      }
    },
    {
      oldFile: () => {
        return {
          path: () => "my3rdTest.ts"
        };
      }
    }
  ];
  // when
  const count = countMatchingFiles(patches, "**/*.js");
  // then
  expect(count).toEqual(3);
});
