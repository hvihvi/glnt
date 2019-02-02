import { Message } from "./Message";

export type Apply = (...args: any[]) => Promise<Result>;

export interface Result {
  pass: boolean;
  message?: Message;
}

export const PASS: Result = { pass: true };

export interface Rule {
  name: string;
  apply: Apply;
}
