// /medical-bot-backend/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  // Core identity
  email: { type: String, required: true, unique: true, index: true },

  // Local auth
  password: {
    type: String,
    required: function () {
      return this.provider === "local";
    },
  },

  // Auth provider metadata
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
    index: true,
  },
  googleId: { type: String, unique: true, sparse: true },

  // Profile
  name: { type: String },
  picture: { type: String },
  googleProfile: { type: Object }, // snapshot of Google payload if you want it

  // Ops
  lastLoginAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving (only for local users, and only if modified)
UserSchema.pre("save", async function (next) {
  if (this.provider !== "local") return next();
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare input password with hashed password
UserSchema.methods.comparePassword = function (candidate) {
  if (!this.password) return Promise.resolve(false);
  return bcrypt.compare(candidate, this.password);
};

// Hide sensitive fields when converting to JSON
UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
