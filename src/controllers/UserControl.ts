import { transporter } from "../middleware/authRequired";
import User from "../module/User";
import { Request, Response, NextFunction, CookieOptions } from "express";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TemplateListSchema } from "../module/TemplateList";
import { baseURl } from "../config/database";
import { UserDetailsSchema } from "../module/UserDetails";
const salt = 12;

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      res.send({
        status: 400,
        error: "user with this mail already exist..!",
      });
    } else {
      const { name, password, role, confirmpass, profile, profileurl } =
        req.body;
      if (password !== confirmpass) {
        res.send({
          status: 400,
          error: "Password and confirm passwrod is matched..!",
        });
      }
      // uploadImage(filePath, destination)
      const otp = Math.floor(1000 + Math.random() * 9000);
      const hashotp = await brcypt.hash(String(otp), 10);
      req.body.otp = otp;

      const newUser = await new User({
        email,
        name,
        password: await brcypt.hash(password, 12),
        role,
        profile: profileurl,
        otp: hashotp,
      });
      newUser
        .save()
        .then((response) => {
          res.send({
            status: 202,
            response: "user created successfully, Please verify your email..!",
          });

          next();
        })
        .catch((error) => {
          res.send({ status: 401, error: error });
        });
    }
  } catch (error) {
    res.send({ status: 500, error: "something went wrong" + error });
  }
};

export const SentOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = User.findOne({ email });
    const generatedOTP = req.body.otp;
    SendMail(email, generatedOTP, res);
  } catch (error) {
    res.send({ status: 500, message: error });
  }
};

export const SendMail = (
  email: string,
  otp: string | number,
  res: Response
) => {
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

    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        res.send({
          status: 404,
          error: error.message,
        });
      } else {
        res.send({
          status: 201,
          message: info.messageId,
        });
      }
    });
  } catch (error) {
    res.send({ status: 500, message: error });
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const otpverify = await brcypt.compare(otp, user.otp);
      if (otpverify) {
        const update = await User.findOneAndUpdate(
          { email },
          { varified: true }
        );
        res.send({
          status: 201,
          message: "User details verified usccessfully.!",
        });
      } else res.send({ status: 401, message: "wrong otp..!" });
    } else {
      res.send({ status: 404, message: "User not fount" });
    }
  } catch (error) {
    res.send({ status: 500, message: error });
  }
};

export const resendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const user = await User.find({ email });
    if (user) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const hashotp = await brcypt.hash(String(otp), 10);
      await User.findOneAndUpdate({ email }, { $set: { otp: hashotp } });
      SendMail(email, otp, res);
    } else {
      res.send({ status: 404, message: "user not found..!" });
    }
  } catch (error) {
    res.send({ status: 500, message: error });
  }
};

export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (!user.varified) {
        return res.send({
          statue: 403,
          message: "user not verified to get the details",
        });
      }
      //complete code her
      const { password } = req.body;
      const verfied = await brcypt.compare(password, user.password);
      if (verfied) {
        const token = jwt.sign(
          { email, name: user.name, role: user.role },
          String(process.env.JWT_SECRCT_CODE),
          { expiresIn: "30d" }
        );
        res.cookie("token", token, { expiresIn: "1d" } as CookieOptions);
        res.send({
          status: 201,
          token,
          user: {
            name: user.name,
            email: email,
            role: user.role,
          },
        });
      } else {
        res.send({ status: 401, message: "Unauthorized" });
      }
    } else {
      res.send({
        status: 404,
        message: "user with this email id dont exist..!",
      });
    }
  } catch (error) {
    res.send({ status: 500, error: "something went wrong" + error });
  }
};

export const ForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.find({ email });
    const link = await jwt.sign(
      { email },
      String(process.env.JWT_SECRCT_CODE),
      { expiresIn: "5min" }
    );
    if (user) {
      transporter.sendMail(
        {
          from: "sunnapushashidhar@gmail.com",
          to: email,
          subject: "Reset otp",
          text: "",
          html: `reset otp link:- ${baseURl}/${email}/${link}`,
        },
        (error, info) => {
          if (error) {
            res.send({ status: 400, message: error.message });
          } else {
            res.send({
              status: 201,
              message: "successfully sent login link to mail",
            });
          }
        }
      );
    } else {
      res.send({ status: 404, message: "user not fount..!" });
    }
  } catch (error) {
    res.send({ status: 500, message: error });
  }
};

export const ResetPassword = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.send({ status: 500, mesage: "Oops something went wrong" + error });
  }
};

export const tokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["token"] as string;
  if (token) {
    jwt.verify(
      token,
      String(process.env.JWT_SECRCT_CODE),
      (err: jwt.VerifyErrors | null, decode: any) => {
        if (err) {
          res.send({ status: 401, message: err.message });
        } else {
          req.body.user = decode;
          next();
          // res.send({
          //   status: 201,
          //   message: "successfully verified..!",
          //   user: decode,
          // });
        }
      }
    );
  } else {
    res.send({ status: 401, message: "invalide token..!" });
  }
};

export const details = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  // const user = User.find({ email });
  // TemplateListSchema
  UserDetailsSchema.find({userId})

};