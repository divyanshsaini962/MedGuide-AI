export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true;

    // Captures the stack trace and excludes this constructor from it
    Error.captureStackTrace(this, this.constructor);
  }
}
