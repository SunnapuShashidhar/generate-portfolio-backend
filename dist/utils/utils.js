"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmailValidation = void 0;
const checkEmailValidation = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = regEx.test(String(email).toLowerCase().trim());
    console.log("validation", validEmail);
    if (!validEmail) {
        return false;
    }
    return true;
};
exports.checkEmailValidation = checkEmailValidation;
