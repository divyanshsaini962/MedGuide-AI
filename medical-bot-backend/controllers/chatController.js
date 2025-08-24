import { queryRag } from "../services/ragService.js";
import Message from "../models/Message.js";

export async function chat(req, res, next) {
  try {
    const { question, filter } = req.body; // filter: optional Pinecone metadata filter
    const answer = await queryRag(question, 8, filter);
    await Message.create({
      userId: req.user.id,
      question,
      answer,
      meta: { filter: filter || null },
    });
    res.json({ answer });
  } catch (err) {
    next(err);
  }
}
