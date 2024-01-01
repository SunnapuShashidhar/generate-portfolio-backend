"use strict";
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
exports.SignUp = void 0;
const User_1 = __importDefault(require("../module/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const storage_1 = require("firebase/storage");
const Authenticate_1 = require("../routes/Authenticate");
const SignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { email } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        console.log("data-body", req.body);
        console.log("data-file", req.file);
        if (user) {
            res.send({
                status: 400,
                error: "user with this mail already exist..!",
            });
        }
        else {
            const { name, password, role, confirmpass, profile } = req.body;
            if (password !== confirmpass) {
                res.send({
                    status: 400,
                    error: "Password and confirm passwrod is matched..!",
                });
            }
            const dateTime = giveCurrentDateTime();
            const storageRef = (0, storage_1.ref)(Authenticate_1.storage, `files/${((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname) + "       " + dateTime}`);
            const metadata = {
                contentType: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
            };
            const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, (_c = req.file) === null || _c === void 0 ? void 0 : _c.buffer, metadata);
            const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
            const otp = Math.floor(1000 + Math.random() * 9000);
            const hashotp = yield bcrypt_1.default.hash(String(otp), 10);
            req.body.otp = otp;
            const newUser = yield new User_1.default({
                email,
                name,
                password: yield bcrypt_1.default.hash(password, 12),
                role,
                profile: downloadURL,
                otp: hashotp,
            });
            newUser
                .save()
                .then((response) => {
                console.log(response);
                res.send({
                    status: 202,
                    response: "user created successfully, Please verify your email..!",
                });
                next();
            })
                .catch((error) => {
                console.log(error);
                res.send({ status: 401, error: error });
            });
        }
    }
    catch (error) {
        res.send({ status: 500, error: "something went wrong" + error });
    }
});
exports.SignUp = SignUp;
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    return dateTime;
};
