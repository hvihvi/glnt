export enum Level {
  ERROR = "ERROR",
  INFO = "INFO",
  DISABLED = "DISABLED"
}

export const toLevel = (level: string): Level => {
  switch (level) {
    case "ERROR":
      return Level.ERROR;
    case "INFO":
      return Level.INFO;
    case "DISABLED":
    default:
      return Level.DISABLED;
  }
};

export default { toLevel, Level };
