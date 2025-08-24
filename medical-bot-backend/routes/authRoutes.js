// /medical-bot-backend/routes/authRoutes.js
import { Router } from "express";
import { signup, login, googleLogin, me } from "../controllers/authController.js";
import { validateBody } from "../utils/validator.js";
import Joi from "joi";
import auth from "../middleware/auth.js";

const router = Router();

// Schemas
const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const googleSchema = Joi.object({
  idToken: Joi.string().trim().required(),
});

// Routes
router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", validateBody(loginSchema), login);
router.post("/google", validateBody(googleSchema), googleLogin);
router.get("/me", auth, me);

export default router;
