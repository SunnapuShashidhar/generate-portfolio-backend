"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: Buffer,
    },
    otp: {
        type: String,
        required: true,
    },
    varified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "user",
    },
});
exports.default = mongoose_1.default.model("User", User);
