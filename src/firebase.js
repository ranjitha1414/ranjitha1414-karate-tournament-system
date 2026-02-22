// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAAbYFtf6tqE1acTmgKxpiBMQx02jwxlU",
  authDomain: "karate-tournament-63c6a.firebaseapp.com",
  projectId: "karate-tournament-63c6a",
  storageBucket: "karate-tournament-63c6a.firebasestorage.app",
  messagingSenderId: "318150789487",
  appId: "1:318150789487:web:325ed2850030d08d15009a",
  measurementId: "G-EDM2XJY4YV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
