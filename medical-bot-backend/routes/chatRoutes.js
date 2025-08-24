import { Router } from "express";
import auth from "../middleware/auth.js";
import { chat } from "../controllers/chatController.js";
import { createValidator } from "express-joi-validation";
import Joi from "joi";

const router = Router();
const v = createValidator({ passError: true });

const chatSchema = Joi.object({
  question: Joi.string().trim().min(3).max(2000).required(),
  filter: Joi.object().unknown(true).optional(), // allow Pinecone metadata filters later
});

router.post("/", auth, v.body(chatSchema), chat);
export default router;
