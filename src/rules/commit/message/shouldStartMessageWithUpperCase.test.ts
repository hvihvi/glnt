import { messageStartsWithUpperCase } from "./shouldStartMessageWithUpperCase";
import git from "../../../git";

it("should return true if uppercase", () => {
  // given
  const msg = "Hello";
  // when
  const result = messageStartsWithUpperCase(msg);
  // then
  expect(result).toBeTruthy();
});

it("should return false if lowercase", () => {
  // given
  const msg = "hello";
  // when
  const result = messageStartsWithUpperCase(msg);
  // then
  expect(result).toBeFalsy();
});
