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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTemplate = void 0;
const TemplateList_1 = require("../module/TemplateList");
const CreateTemplate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Image, title } = req.body;
        const template = new TemplateList_1.TemplateListSchema({
            Image,
            title,
        });
        const data = yield template.save();
        res.send({
            status: 200,
            message: "template created successfully..!",
            data,
        });
    }
    catch (error) {
        console.log("error", error);
        res.send({ status: 500, message: "Internal server Error...!" });
    }
});
exports.CreateTemplate = CreateTemplate;
