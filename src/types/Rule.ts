import { Message } from "./Message";

export type Rule = (...args: any[]) => Result;

export interface Result {
  pass: boolean;
  message?: Message;
}
