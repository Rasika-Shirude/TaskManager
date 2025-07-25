// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeeZ7wah_6WQpFPsgHN5vpRDGDXi0iH0Y",
  authDomain: "taskmanager-b5054.firebaseapp.com",
  projectId: "taskmanager-b5054",
  storageBucket: "taskmanager-b5054.appspot.com",
  messagingSenderId: "74565823689",
  appId: "1:74565823689:web:006a7e941746afc3c33118",
  measurementId: "G-ED5QM1TMXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Add Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
