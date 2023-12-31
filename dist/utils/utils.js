"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwrodCalidation = exports.checkEmailValidation = void 0;
const checkEmailValidation = (email) => {
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = regEx.test(String(email).toLowerCase().trim());
    console.log("validation", email, "--", validEmail);
    if (!validEmail) {
        return false;
    }
    return true;
};
exports.checkEmailValidation = checkEmailValidation;
const passwrodCalidation = (password, confirmpasword) => {
    const passwordRgux = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (password !== confirmpasword) {
        return "password and confirm password is matching..!";
    }
    else if (password.match(passwordRgux)) {
        return true;
    }
    else {
        return "Password Should be strong..!";
    }
};
exports.passwrodCalidation = passwrodCalidation;
