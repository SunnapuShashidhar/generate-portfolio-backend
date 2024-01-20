import { Request, Response, NextFunction } from "express";
import { TemplateListSchema } from "../module/TemplateList";

export const CreateTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Image, title } = req.body;

    const template = new TemplateListSchema({
      Image,
      title,
    });
    const data = await template.save();
    res.send({
      status: 200,
      message: "template created successfully..!",
      data,
    });
  } catch (error) {
    console.log("error", error);
    res.send({ status: 500, message: "Internal server Error...!" });
  }
};
