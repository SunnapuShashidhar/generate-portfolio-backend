import mongoose, { Schema } from "mongoose";
const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  otp: {
    type: String,
    required: true,
  },
  varified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "super-admin", "user"],
    default: "user",
  },
  selectedTemplate: {
    type: mongoose.Schema.Types.ObjectId || null,
    default: null,
    ref: "templateList",
  },
  details: {
    type: Schema.Types.ObjectId,
    ref: "userdetail",
  },
  designation: {
    type: String || null,
    default: null,
  },
});
// User.index({ name: 1 });

export default mongoose.model("User", User);
