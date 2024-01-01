"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const express_1 = require("express");
const UserControl_1 = require("../controllers/UserControl");
const multer_1 = __importDefault(require("multer"));
const authRequired_1 = require("../middleware/authRequired");
const TemplateList_1 = require("../module/TemplateList");
const storage_1 = require("firebase/storage");
const config_1 = require("../config/config");
const router = (0, express_1.Router)();
// let storage = multer.diskStorage({
//   destination(req, file, callback) {
//     return callback(null, "public/upload");
//   },
//   filename: (req, file, callback) => {
//     return callback(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
(0, config_1.initalizeApp)();
exports.storage = (0, storage_1.getStorage)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// const upload = multer({ storage });
router.get("/", (req, res, next) => {
    console.log("dashbpoard");
    const data = TemplateList_1.TemplateListSchema.find({});
    res.send({ status: 200, data: data });
});
router.post("/sign-up", upload.single("profile"), authRequired_1.SignUpRequired, authRequired_1.isValidate, UserControl_1.SignUp, UserControl_1.SentOTP);
router.post("/sign-in", authRequired_1.SignUpRequired, authRequired_1.isValidate, UserControl_1.SignIn);
router.get("/user", UserControl_1.tokenVerify);
router.put("/otpverify", UserControl_1.verifyOtp);
router.put("/re-send-otp", UserControl_1.resendOtp);
router.post("/forgot-password", UserControl_1.ForgotPassword);
exports.default = router;
