import { Level } from "./Level";
import { Message } from "./Message";

export type Apply = (...args: any[]) => Promise<Result>;

export interface Result {
  pass: boolean;
  message?: Message;
}

export interface Rule {
  apply: Apply;
  name: string;
  level: Level;
}
