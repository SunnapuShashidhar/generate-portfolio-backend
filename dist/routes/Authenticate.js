"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const express_1 = require("express");
const admin = __importStar(require("firebase-admin"));
const fs = __importStar(require("fs"));
const app_1 = require("firebase/app");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const UserControl_1 = require("../controllers/UserControl");
const authRequired_1 = require("../middleware/authRequired");
const TemplateList_1 = require("../module/TemplateList");
const config_1 = require("../config/config");
const serviceAccount = require("../../serviceAccountKey.json");
const router = (0, express_1.Router)();
let filename = "";
let storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        return callback(null, "public/upload");
    },
    filename: (req, file, callback) => {
        filename =
            file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname);
        return callback(null, filename);
    },
});
const upload = (0, multer_1.default)({ storage });
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.storageBucket,
});
function uploadImage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileBuffer = fs.readFileSync(`public/upload/${filename}`);
        const file = bucket.file(`profiles/${filename}`);
        yield file.createWriteStream().end(fileBuffer);
        const downloadURL = yield file.getSignedUrl({
            action: "read",
            expires: "03-09-2025",
        });
        console.log("downloadURL-------", downloadURL);
        req.body.profileurl = downloadURL[0];
        next();
    });
}
exports.uploadImage = uploadImage;
const storage1 = admin.storage();
const bucket = storage1.bucket();
router.get("/", (req, res, next) => {
    const data = TemplateList_1.TemplateListSchema.find({});
    res.send({ status: 200, data: data });
});
router.post("/sign-up", upload.single("profile"), uploadImage, authRequired_1.SignUpRequired, authRequired_1.isValidate, UserControl_1.SignUp, UserControl_1.SentOTP);
router.post("/sign-in", authRequired_1.SignUpRequired, authRequired_1.isValidate, UserControl_1.SignIn);
(0, app_1.initializeApp)(config_1.firebaseConfig);
router.post("/uploadimage", upload.single("profile"), uploadImage);
router.get("/user", UserControl_1.tokenVerify);
router.put("/otpverify", UserControl_1.verifyOtp);
router.put("/re-send-otp", UserControl_1.resendOtp);
router.post("/forgot-password", UserControl_1.ForgotPassword);
exports.default = router;
