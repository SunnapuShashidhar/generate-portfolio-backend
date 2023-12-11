"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpModule = void 0;
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    otp: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});
exports.otpModule = (0, mongoose_1.model)("otp", otpSchema);
