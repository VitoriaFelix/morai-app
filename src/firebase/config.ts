import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC__FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC__FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC__FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC__FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC__FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC__FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC__FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

