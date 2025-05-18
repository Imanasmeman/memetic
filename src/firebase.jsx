// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Realtime Database
import { getStorage } from "firebase/storage";   // Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyBjM2b-IG1ZeetDvpzlZfhTZPTbJbTeAWM",
  authDomain: "memetic-b2143.firebaseapp.com",
  projectId: "memetic-b2143",
  storageBucket: "memetic-b2143.appspot.com",  // 🔄 Corrected domain (.appspot.com is used by Firebase Storage)
  messagingSenderId: "430502229782",
  appId: "1:430502229782:web:0f095c5491bb3ffea80237",
  measurementId: "G-HZ1M2PBCFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);       // Realtime Database
export const storage = getStorage(app);   // Firebase Storage
const analytics = getAnalytics(app);
