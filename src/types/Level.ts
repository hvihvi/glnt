export enum Level {
  ERROR,
  INFO,
  DISABLED
}

const toString = (level: Level): string => {
  switch (level) {
    case Level.ERROR:
      return "ERROR";
    case Level.INFO:
      return "INFO";
    case Level.DISABLED:
    default:
      return "DISABLED";
  }
};

export const toLevel = (level: string): Level => {
  switch (level) {
    case "ERROR":
    case "1":
      return Level.ERROR;
    case "INFO":
    case "2":
      return Level.INFO;
    case "DISABLED":
    case "3":
    default:
      return Level.DISABLED;
  }
};

export default { toString, toLevel, Level };
