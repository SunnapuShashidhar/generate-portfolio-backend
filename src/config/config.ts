import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} = process.env;

export const firebaseConfig = {
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
