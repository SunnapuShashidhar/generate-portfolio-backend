import mongoose from "mongoose";

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: Buffer,
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
    default: "user",
  },
});

export default mongoose.model("User", User);
