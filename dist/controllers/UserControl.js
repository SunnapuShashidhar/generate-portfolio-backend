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
exports.details = exports.tokenVerify = exports.ResetPassword = exports.ForgotPassword = exports.SignIn = exports.resendOtp = exports.verifyOtp = exports.SendMail = exports.SentOTP = exports.SignUp = void 0;
const authRequired_1 = require("../middleware/authRequired");
const User_1 = __importDefault(require("../module/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const UserDetails_1 = require("../module/UserDetails");
const salt = 12;
const SignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
            const otp = Math.floor(1000 + Math.random() * 9000);
            const hashotp = yield bcrypt_1.default.hash(String(otp), 10);
            req.body.otp = otp;
            const newUser = yield new User_1.default({
                email,
                name,
                password: yield bcrypt_1.default.hash(password, 12),
                role,
                profile: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
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
const SentOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = User_1.default.findOne({ email });
        const generatedOTP = req.body.otp;
        (0, exports.SendMail)(email, generatedOTP, res);
    }
    catch (error) {
        res.send({ status: 500, message: error });
    }
});
exports.SentOTP = SentOTP;
const SendMail = (email, otp, res) => {
    try {
        const mailData = {
            from: "sunnapushashidhar@gmail.com",
            to: email,
            subject: "OTP for verify",
            text: "otp is ",
            html: `<p>
      <p>otp to verify your account</p>
      <h1>${otp && otp}</h1>
      </p>`,
        };
        authRequired_1.transporter.sendMail(mailData, (error, info) => {
            if (error) {
                res.send({
                    status: 404,
                    error: error.message,
                });
            }
            else {
                res.send({
                    status: 201,
                    message: info.messageId,
                });
            }
        });
    }
    catch (error) {
        res.send({ status: 500, message: error });
    }
};
exports.SendMail = SendMail;
const verifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (user) {
            const otpverify = yield bcrypt_1.default.compare(otp, user.otp);
            console.log("otpverify", otpverify);
            if (otpverify) {
                const update = yield User_1.default.findOneAndUpdate({ email }, { varified: true });
                console.log("updated--", update);
                res.send({
                    status: 201,
                    message: "User details verified usccessfully.!",
                });
            }
            else
                res.send({ status: 401, message: "wrong otp..!" });
        }
        else {
            res.send({ status: 404, message: "User not fount" });
        }
    }
    catch (error) {
        res.send({ status: 500, message: error });
    }
});
exports.verifyOtp = verifyOtp;
const resendOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_1.default.find({ email });
        if (user) {
            const otp = Math.floor(1000 + Math.random() * 9000);
            const hashotp = yield bcrypt_1.default.hash(String(otp), 10);
            yield User_1.default.findOneAndUpdate({ email }, { $set: { otp: hashotp } });
            (0, exports.SendMail)(email, otp, res);
        }
        else {
            res.send({ status: 404, message: "user not found..!" });
        }
    }
    catch (error) {
        res.send({ status: 500, message: error });
    }
});
exports.resendOtp = resendOtp;
const SignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (user) {
            //complete code her
            const { password } = req.body;
            const verfied = yield bcrypt_1.default.compare(password, user.password);
            if (verfied) {
                const token = jsonwebtoken_1.default.sign({ email, name: user.name, role: user.role }, String(process.env.JWT_SECRCT_CODE), { expiresIn: "30d" });
                res.cookie("token", token, { expiresIn: "1d" });
                res.send({
                    status: 201,
                    token,
                    user: {
                        name: user.name,
                        email: email,
                        role: user.role,
                    },
                });
            }
            else {
                res.send({ status: 401, message: "Unauthorized" });
            }
        }
        else {
            res.send({
                status: 404,
                message: "user with this email id dont exist..!",
            });
        }
    }
    catch (error) {
        res.send({ status: 500, error: "something went wrong" + error });
    }
});
exports.SignIn = SignIn;
const ForgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_1.default.find({ email });
        const link = yield jsonwebtoken_1.default.sign({ email }, String(process.env.JWT_SECRCT_CODE), { expiresIn: "5min" });
        if (user) {
            authRequired_1.transporter.sendMail({
                from: "sunnapushashidhar@gmail.com",
                to: email,
                subject: "Reset otp",
                text: "",
                html: `reset otp link:- ${database_1.baseURl}/${email}/${link}`,
            }, (error, info) => {
                if (error) {
                    res.send({ status: 400, message: error.message });
                }
                else {
                    res.send({
                        status: 201,
                        message: "successfully sent login link to mail",
                    });
                }
            });
        }
        else {
            res.send({ status: 404, message: "user not fount..!" });
        }
    }
    catch (error) {
        res.send({ status: 500, message: error });
    }
});
exports.ForgotPassword = ForgotPassword;
const ResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.send({ status: 500, mesage: "Oops something went wrong" + error });
    }
});
exports.ResetPassword = ResetPassword;
const tokenVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["token"];
    if (token) {
        jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRCT_CODE), (err, decode) => {
            if (err) {
                res.send({ status: 401, message: err.message });
            }
            else {
                req.body.user = decode;
                next();
                // res.send({
                //   status: 201,
                //   message: "successfully verified..!",
                //   user: decode,
                // });
            }
        });
    }
    else {
        res.send({ status: 401, message: "invalide token..!" });
    }
});
exports.tokenVerify = tokenVerify;
const details = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    // const user = User.find({ email });
    // TemplateListSchema
    UserDetails_1.UserDetailsSchema.find({ userId });
});
exports.details = details;
