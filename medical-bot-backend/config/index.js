import "dotenv/config";

export const PORT = parseInt(process.env.PORT, 10) || 8080;
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/medical_bot";
export const JWT_SECRET = process.env.JWT_SECRET || "super-secret";
export const PINECONE_API_KEY = process.env.PINECONE_API_KEY || "";
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
export const PINECONE_ENV = process.env.PINECONE_ENV || "us-east-1-gcp";
export const INDEX_NAME = process.env.INDEX_NAME || "medical-chatbot";

// Add this:
export const system_prompt =
  process.env.SYSTEM_PROMPT || "You are a helpful medical assistant.";

// Google OAuth configuration
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
