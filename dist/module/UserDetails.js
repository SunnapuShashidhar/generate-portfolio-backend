"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailsSchema = void 0;
const mongoose_1 = require("mongoose");
const UserDetails = new mongoose_1.Schema({
    designation: {
        type: String || null,
        default: null,
    },
    skillSet: [
        {
            type: mongoose_1.Schema.Types.ObjectId || null,
            ref: "skillset",
            default: null,
        },
    ],
    aboutmeTitle: {
        type: String || null,
        default: null,
    },
    aboutme: [
        {
            type: mongoose_1.Schema.Types.ObjectId || null,
            ref: "aboutme",
            default: null,
        },
    ],
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
});
exports.UserDetailsSchema = (0, mongoose_1.model)("userdetail", UserDetails);
