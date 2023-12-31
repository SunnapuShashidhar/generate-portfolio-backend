import { Router } from "express";
import {
  ForgotPassword,
  SentOTP,
  SignIn,
  SignUp,
  resendOtp,
  verifyOtp,
  userDetails,
} from "../controllers/UserControl";

const router = Router();

router.post("/sign-up", SignUp, SentOTP);
router.post("/sign-in", SignIn);

router.get("/user", userDetails);
router.put("/otpverify", verifyOtp);
router.put("/re-send-otp", resendOtp);
router.post("/forgot-password", ForgotPassword);
export default router;
