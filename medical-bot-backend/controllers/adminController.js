// /medical-bot-backend/controllers/adminController.js
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { JWT_SECRET, GOOGLE_CLIENT_ID } from "../config/index.js";

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

function createToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d" });
}

export async function signup(req, res, next) {
  try {
    const email = String(req.body.email || "")
      .toLowerCase()
      .trim();
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email in use" });
    }

    const user = new User({
      email,
      password,
      provider: "local",
      lastLoginAt: new Date(),
    });
    await user.save();

    const token = createToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || null,
        picture: user.picture || null,
        provider: user.provider,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const email = String(req.body.email || "")
      .toLowerCase()
      .trim();
    const { password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If the user is a Google-only account, block password login
    if (user.provider === "google" && !user.password) {
      return res.status(400).json({
        error: "This account uses Google Sign-In. Use /api/auth/google.",
      });
    }

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    user.lastLoginAt = new Date();
    await user.save();

    const token = createToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || null,
        picture: user.picture || null,
        provider: user.provider,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function googleLogin(req, res, next) {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: "Missing idToken" });

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const googleId = payload.sub;
    const email = String(payload.email || "")
      .toLowerCase()
      .trim();
    const name = payload.name || null;
    const picture = payload.picture || null;

    if (!email) {
      return res.status(400).json({ error: "Google profile missing email" });
    }

    // Upsert user based on googleId or email
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      user = new User({
        email,
        provider: "google",
        googleId,
        name,
        picture,
        googleProfile: payload,
        lastLoginAt: new Date(),
      });
      await user.save();
    } else {
      user.provider = "google";
      user.googleId = user.googleId || googleId;
      user.name = name || user.name;
      user.picture = picture || user.picture;
      user.googleProfile = payload; // snapshot latest payload
      user.lastLoginAt = new Date();
      await user.save();
    }

    const token = createToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || null,
        picture: user.picture || null,
        provider: user.provider,
      },
    });
  } catch (err) {
    // Most common cause: invalid token or wrong audience (client ID)
    err.statusCode = 401;
    next(err);
  }
}

export async function status(req, res) {
  try {
    res.json({
      ok: true,
      service: "admin",
      environment: process.env.NODE_ENV || "development",
      pid: process.pid,
      uptimeSec: Number(process.uptime().toFixed(2)),
      memoryMB: Math.round(process.memoryUsage().rss / (1024 * 1024)),
      node: process.version,
      timestamp: new Date().toISOString(),
      user: req.user?.id || null,
    });
  } catch (_err) {
    res.status(500).json({ ok: false, error: "Admin status check failed" });
  }
}
