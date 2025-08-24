import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import logger from "./utils/logger.js";
import { PORT } from "./config/index.js";

// Load environment variables
dotenv.config();

const app = express();

// Database Connection
connectDB().catch((err) => {
  console.error("Failed to connect to DB:", err.message);
  process.exit(1);
});

// Middlewares
app.use(express.json()); // Parse JSON request bodies

// Configure security headers with specific settings for Google Sign-In
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://accounts.google.com"],
        frameSrc: ["'self'", "https://accounts.google.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// Configure CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

// Basic request rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // Max 60 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS setup
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:3000","http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Request Logger
app.use((req, _, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Health check endpoint
app.get("/api/health", (_, res) => res.json({ ok: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);

// Handle unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ status: "fail", message: "Route not found" });
});

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
