import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRarrqeZw1ay2AJZQuM36PyF9kRKI2e8s",
  authDomain: "login-signup-nextjs.firebaseapp.com",
  projectId: "login-signup-nextjs",
  storageBucket: "login-signup-nextjs.appspot.com",
  messagingSenderId: "960306077661",
  appId: "1:960306077661:web:0448d36415201bd8912034",
  measurementId: "G-KDGR6JLGQS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
