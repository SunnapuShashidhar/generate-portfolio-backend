"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initalizeApp = void 0;
const app_1 = require("firebase/app");
// import { getAnalytics } from "firebase/analytics";
const { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId, measurementId, } = process.env;
const firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
};
const initalizeApp = () => (0, app_1.initializeApp)(firebaseConfig);
exports.initalizeApp = initalizeApp;
// export const analytics = getAnalytics(app);
