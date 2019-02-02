import { users } from "./shouldNotBeUsedByOthers";

it("should filter origin and ignores branches", () => {
  // given
  const isUsedBy = [
    "origin/test1",
    "origin/test2",
    "origin/test3",
    "origin/test4",
    "origin/master"
  ];
  // when
  const usrs = users(
    isUsedBy,
    ["origin/test1", "origin/test2"],
    "origin/master"
  );
  // then
  expect(usrs).toEqual(["origin/test3", "origin/test4"]);
});
