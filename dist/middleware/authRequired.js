"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = exports.isValidate = exports.SignAdminREquired = exports.SingnInRequired = exports.SignUpRequired = void 0;
const express_validator_1 = require("express-validator");
const nodemailer_1 = require("nodemailer");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.SignUpRequired = [
    (0, express_validator_1.check)("email").isEmail().withMessage("Email is not valid..!"),
    (0, express_validator_1.check)("password")
        .isStrongPassword()
        .withMessage("password should be strong..!"),
];
exports.SingnInRequired = [
    (0, express_validator_1.check)("email").isEmail().withMessage("Email is not valid..!"),
];
exports.SignAdminREquired = [
    (0, express_validator_1.check)("role")
        .matches("admin" || "super-admin")
        .withMessage("Only Admin can add templates..!"),
];
const isValidate = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.send({ status: 400, message: error.array()[0] });
    }
    next();
};
exports.isValidate = isValidate;
exports.transporter = (0, nodemailer_1.createTransport)({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "sunnapushashidhar@gmail.com",
        pass: "hbxhgaclkgfyibdt",
    },
    secure: true,
});
