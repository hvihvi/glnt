import { Level } from "./Level";

export interface Message {
  content: string;
  level: Level;
  commit?: string;
}
