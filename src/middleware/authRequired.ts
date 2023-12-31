import { check, validationResult } from "express-validator";
import nodemailer, { Transporter, createTransport } from "nodemailer";
import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { checkEmailValidation, passwrodCalidation } from "../utils/utils";
config();
export const SignUpRequired = [
  check("email").isEmail().withMessage("Email is not valid..!"),
  check("password")
    .isStrongPassword()
    .withMessage("password should be strong..!"),
  check("name")
    .isLength({ min: 4 })
    .withMessage("Name should be atleast 4 charators"),
];

export const SingnInRequired = [
  check("email").isEmail().withMessage("Email is not valid..!"),
];

export const isValidate = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.send({ status: 400, message: error.array()[0] });
  }
  next();
};

export const transporter = createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "sunnapushashidhar@gmail.com",
    pass: "hbxhgaclkgfyibdt",
  },
  secure: true,
});
