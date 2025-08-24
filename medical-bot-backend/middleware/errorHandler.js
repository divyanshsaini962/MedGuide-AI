import { AppError } from "../utils/AppError.js";

export default function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong.";

  // Log full error in all environments
  console.error("💥 Error:", err);

  const response = {
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err,
    }),
  };

  res.status(statusCode).json(response);
}
