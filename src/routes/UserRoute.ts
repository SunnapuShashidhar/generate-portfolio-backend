import { Router } from "express";
import {
  ForgotPassword,
  SentOTP,
  SignIn,
  SignUp,
  resendOtp,
  verifyOtp,
  tokenVerify,
} from "../controllers/UserControl";
import multer from "multer";
import path from "path";
import { SignUpRequired, isValidate } from "../middleware/authRequired";
import { TemplateListSchema } from "../module/TemplateList";

const router = Router();

let storage = multer.diskStorage({
  destination(req, file, callback) {
    return callback(null, "public/upload");
  },
  filename: (req, file, callback) => {
    return callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
router.get("/", (req, res, next) => {
  console.log("dashbpoard");
  const data = TemplateListSchema.find({});
  res.send({ status: 200, data: data });
});

router.post(
  "/sign-up",
  upload.single("profile"),
  SignUpRequired,
  isValidate,
  SignUp,
  SentOTP
);
router.post("/sign-in", SignUpRequired, isValidate, SignIn);

router.get("/user", tokenVerify);
router.put("/otpverify", verifyOtp);
router.put("/re-send-otp", resendOtp);
router.post("/forgot-password", ForgotPassword);
export default router;


