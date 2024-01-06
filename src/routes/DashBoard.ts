import { Router } from "express";
import { TemplateListSchema } from "../module/TemplateList";

const route = Router();

route.get("/", (req, res, next) => {
  const data = TemplateListSchema.find({});
  res.send({ status: 200, data: data });
});



export default route;
