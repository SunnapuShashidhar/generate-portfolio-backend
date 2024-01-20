import multer from "multer";
import path from "path";
import * as admin from "firebase-admin";
import * as fs from "fs";
import { NextFunction, Request, Response } from "express";
const serviceAccount = require("../../serviceAccountKey.json");

const fileUploader = (catogert: string = "profiles") => {
  let filename = "";
  let storage = multer.diskStorage({
    destination(req, file, callback) {
      return callback(null, "public/upload");
    },
    filename: (req, file, callback) => {
      filename =
        file.fieldname + "-" + Date.now() + path.extname(file.originalname);
      return callback(null, filename);
    },
  });

  const upload = multer({ storage });

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.storageBucket,
    });
  }
  const uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const fileBuffer = fs.readFileSync(`public/upload/${filename}`);
    const file = bucket.file(`${catogert}/${filename}`);

    await file.createWriteStream().end(fileBuffer);

    const downloadURL = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2025",
    });
    console.log("downloadURL-------", downloadURL);
    const catogertURl = catogert + "Url";
    req.body.catogertURl = downloadURL[0];
    next();
  };
  const firebaseStorage = admin.storage();
  const bucket = firebaseStorage.bucket();
  return {
    uploadImage,
    upload,
  };
};

export default fileUploader;
