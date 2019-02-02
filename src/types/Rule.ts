import { Level } from "./Level";

export type Apply = (...args: any[]) => Promise<Result>;

export interface Result {
  pass: boolean;
  message?: string;
}

export interface ResultWithLevel extends Result {
  level?: Level;
}

export const PASS: Result = { pass: true };

export const FAIL = (message: string): Result => {
  return { pass: false, message };
};

export interface Rule {
  name: string;
  apply: Apply;
}
