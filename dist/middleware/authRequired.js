"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = exports.isValidate = exports.SingnInRequired = exports.SignUpRequired = void 0;
const express_validator_1 = require("express-validator");
const nodemailer_1 = require("nodemailer");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.SignUpRequired = [
    (0, express_validator_1.check)("email").isEmail().withMessage("Email is not valid..!"),
    (0, express_validator_1.check)("password")
        .isStrongPassword()
        .withMessage("password should be strong..!"),
    (0, express_validator_1.check)("name")
        .isLength({ min: 4 })
        .withMessage("Name should be atleast 4 charators"),
];
exports.SingnInRequired = [
    (0, express_validator_1.check)("email").isEmail().withMessage("Email is not valid..!"),
];
const isValidate = (req, res, next) => {
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
