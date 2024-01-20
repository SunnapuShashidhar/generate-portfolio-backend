import mongoose, { Schema } from "mongoose";

const TemplateList = new Schema({
  Image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tempId: {
    type: Number,
    required: true,
    unique: true,
  },
});

TemplateList.pre("save", async function (next) {
  const templateList = this;

  if (!templateList.tempId) {
    try {
      const lastDocument = await TemplateListSchema.findOne()
        .sort({ tempId: -1 })
        .exec();
      templateList.tempId =
        lastDocument && lastDocument.tempId ? lastDocument.tempId + 1 : 1;
      next();
    } catch (err) {
      console.log("error", err);
      return next();
    }
  } else {
    next();
  }
});
// TemplateList.index({ title: 1 });
export const TemplateListSchema = mongoose.model("templatelist", TemplateList);
