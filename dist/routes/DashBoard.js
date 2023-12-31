"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TemplateList_1 = require("../module/TemplateList");
const route = (0, express_1.Router)();
route.get("/", (req, res, next) => {
    const data = TemplateList_1.TemplateListSchema.find({});
    res.send({ status: 200, data: data });
});
exports.default = route;
