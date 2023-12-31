import mongoose, { Schema, model } from "mongoose";

const Skillset = new Schema({
  image: {
    type: String,
  },
  rank: {
    type: Number,
  },
  title: {
    type: String,
  },
});

export const SkillsetSchema = mongoose.model("skillset", Skillset);
