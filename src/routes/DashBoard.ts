import { Router } from "express";
import { TemplateListSchema } from "../module/TemplateList";
import {
  SignAdminREquired,
  SingnInRequired,
  isValidate,
} from "../middleware/authRequired";
import fileUploader from "../utils/ImageUpload";
import { CreateTemplate } from "../controllers/templates";
import { tokenVerify } from "../controllers/UserControl";

const router = Router();
router.get("/user", tokenVerify);

router.get("/", (req, res, next) => {
  const data = TemplateListSchema.find({});
  res.send({ status: 200, data: data });
});
const uploaded = fileUploader("template");
// template creation
router.post(
  "/",
  SingnInRequired,
  isValidate,
  SignAdminREquired,
  isValidate,
  uploaded.upload.single("template"),
  uploaded.uploadImage,
  CreateTemplate
);

export default router;
