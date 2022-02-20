import { createLogger, transports, format } from "winston";
export function buildDevLogger() {

  return createLogger({
    transports: [new transports.Console({ level: "silly" })],
    format: format.combine(
      format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ timestamp, level, message, stack }) => {
        return `[${timestamp}] ${level}: ${stack || message}`;
      })
    ),
  });

}