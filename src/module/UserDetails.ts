import mongoose, { Schema, model } from "mongoose";

const UserDetails = new Schema({
  designation: {
    type: String || null,
    default: null,
  },
  skillSet: [
    {
      type: Schema.Types.ObjectId || null,
      ref: "skillset",
      default: null,
    },
  ],
  aboutmeTitle: {
    type: String || null,
    default: null,
  },
  aboutme: [
    {
      type: Schema.Types.ObjectId || null,
      ref: "aboutme",
      default: null,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
});

export const UserDetailsSchema = model("userdetail", UserDetails);
