"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserControl_1 = require("../controllers/UserControl");
const router = (0, express_1.Router)();
router.post("/sign-up", UserControl_1.SignUp, UserControl_1.SentOTP);
router.post("/sign-in", UserControl_1.SignIn);
router.get("/user", UserControl_1.verifyToken);
router.put("/otpverify", UserControl_1.verifyOtp);
router.put("/re-send-otp", UserControl_1.resendOtp);
router.post("/forgot-password", UserControl_1.ForgotPassword);
exports.default = router;