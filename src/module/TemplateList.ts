import mongoose, { Schema } from "mongoose";

const TemplateList = new Schema({
  Image: {
    type: Buffer,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
});
// TemplateList.index({ title: 1 });
export const TemplateListSchema = mongoose.model("templateList", TemplateList);
