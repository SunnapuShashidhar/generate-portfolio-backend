import mongoose, { Schema } from "mongoose";

const SingleTemplteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export const SingleTemplate = mongoose.model(
  "singleTemplate",
  SingleTemplteSchema
);
