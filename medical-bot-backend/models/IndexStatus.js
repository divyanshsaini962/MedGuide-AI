import mongoose from "mongoose";

const IndexStatusSchema = new mongoose.Schema({
  status: String,
  details: Object,
  timestamp: { type: Date, default: Date.now },
});

const IndexStatus = mongoose.model("IndexStatus", IndexStatusSchema);

export default IndexStatus;
