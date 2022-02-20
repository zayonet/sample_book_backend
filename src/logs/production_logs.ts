import { createLogger, transports, format } from "winston";


export function buildProductLogger() {

  return createLogger({
    transports: [
      new transports.Console({ level: "silly" }),
      new transports.File({ filename: 'app.log', level: "info" }),],
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    ),
    defaultMeta: { serve: 'user-service' },
  });
}