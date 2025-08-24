import winston from "winston";

const { combine, timestamp, printf } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp(),
    printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
