import mongoose, { Schema } from "mongoose";

const AboutMe = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

export const AboutMeSchema = mongoose.model("aboutme", AboutMe);
