import { Level } from "./Level";
import { Message } from "./Message";

export type Apply = (...args: any[]) => Promise<Result>;

export interface Result {
  pass: boolean;
  message?: Message;
}

export interface ResultWithLevel extends Result {
  level?: Level;
}

export const PASS: Result = { pass: true };

export const FAIL = (message: Message): Result => {
  return { pass: false, message };
};

export interface Rule {
  name: string;
  apply: Apply;
}
