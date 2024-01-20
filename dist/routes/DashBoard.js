"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TemplateList_1 = require("../module/TemplateList");
const authRequired_1 = require("../middleware/authRequired");
const ImageUpload_1 = __importDefault(require("../utils/ImageUpload"));
const templates_1 = require("../controllers/templates");
const UserControl_1 = require("../controllers/UserControl");
const router = (0, express_1.Router)();
router.get("/user", UserControl_1.tokenVerify);
router.get("/", (req, res, next) => {
    const data = TemplateList_1.TemplateListSchema.find({});
    res.send({ status: 200, data: data });
});
const uploaded = (0, ImageUpload_1.default)("template");
// template creation
router.post("/", authRequired_1.SingnInRequired, authRequired_1.isValidate, authRequired_1.SignAdminREquired, authRequired_1.isValidate, uploaded.upload.single("template"), uploaded.uploadImage, templates_1.CreateTemplate);
exports.default = router;
