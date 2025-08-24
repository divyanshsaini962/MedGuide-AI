import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: String,
  answer: String,
  metadata: Object,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
