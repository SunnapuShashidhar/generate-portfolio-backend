import { NextFunction, Response, Request, Router } from "express";
import * as admin from "firebase-admin";
import * as fs from "fs";
import { initializeApp } from "firebase/app";
import multer from "multer";
import path from "path";
import {
  ForgotPassword,
  SentOTP,
  SignIn,
  resendOtp,
  verifyOtp,
  tokenVerify,
  SignUp,
} from "../controllers/UserControl";

import { SignUpRequired, isValidate } from "../middleware/authRequired";
import { TemplateListSchema } from "../module/TemplateList";
import { firebaseConfig } from "../config/config";
const serviceAccount = require("../../serviceAccountKey.json");

const router = Router();
let filename = "";

let storage = multer.diskStorage({
  destination(req, file, callback) {
    return callback(null, "public/upload");
  },
  filename: (req, file, callback) => {
    filename =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    return callback(null, filename);
  },
});

const upload = multer({ storage });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.storageBucket,
});
export async function uploadImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const fileBuffer = fs.readFileSync(`public/upload/${filename}`);
  const file = bucket.file(`profiles/${filename}`);

  await file.createWriteStream().end(fileBuffer);

  const downloadURL = await file.getSignedUrl({
    action: "read",
    expires: "03-09-2025",
  });
  console.log("downloadURL-------", downloadURL);
  req.body.profileurl = downloadURL[0];
  next();
}
const storage1 = admin.storage();
const bucket = storage1.bucket();
router.get("/", (req, res, next) => {
  const data = TemplateListSchema.find({});
  res.send({ status: 200, data: data });
});

router.post(
  "/sign-up",
  upload.single("profile"),
  uploadImage,
  SignUpRequired,
  isValidate,
  SignUp,
  SentOTP
);
router.post("/sign-in", SignUpRequired, isValidate, SignIn);
initializeApp(firebaseConfig);

router.post("/uploadimage", upload.single("profile"), uploadImage);

router.get("/user", tokenVerify);
router.put("/otpverify", verifyOtp);
router.put("/re-send-otp", resendOtp);
router.post("/forgot-password", ForgotPassword);
export default router;
