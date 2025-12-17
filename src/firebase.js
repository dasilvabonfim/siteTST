// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDWlmhKiTJdt6CKNbBriMSOoM5CLrLUtNc",
  authDomain: "site-tst-e44e6.firebaseapp.com",
  projectId: "site-tst-e44e6",
  storageBucket: "site-tst-e44e6.firebasestorage.app",
  messagingSenderId: "747063469040",
  appId: "1:747063469040:web:1befdbd75aabeaa7cdf335",
  measurementId: "G-J9DZMLMXWC",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics };
