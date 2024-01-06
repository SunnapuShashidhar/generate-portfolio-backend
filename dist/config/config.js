"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = void 0;
// import { getAnalytics } from "firebase/analytics";
const { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId, measurementId, } = process.env;
exports.firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
};
// export const initalizeApp = () => initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
