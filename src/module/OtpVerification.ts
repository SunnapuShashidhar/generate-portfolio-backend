import { Schema, model } from "mongoose";

const otpSchema = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const otpModule = model("otp", otpSchema);
