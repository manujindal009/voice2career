import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYUz8XYEqijx_NiUnvPbcaYqHyHEuTkdE",
  authDomain: "voice2career.firebaseapp.com",
  projectId: "voice2career",
  storageBucket: "voice2career.appspot.com",
  messagingSenderId: "639922148294",
  appId: "1:639922148294:web:b2e3be238099a42aaa98c7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
