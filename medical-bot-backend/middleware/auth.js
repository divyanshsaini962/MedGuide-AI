import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js"; // Explicit .js extension

export default function auth(req, res, next) {
  const authHeader = req.header("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
}
