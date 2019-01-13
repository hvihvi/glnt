import util from "./util";

it("toLineArray should return an array", () => {
  // given
  const str = "aze\neza\ndsa\n\ncazera";
  // when
  const array = util.toLineArray(str);
  // then
  expect(array).toEqual(["aze", "eza", "dsa", "cazera"]);
});
