// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB0Ziru692paC3_QD2xvjupXsSeluJts8",
  authDomain: "bytesplashinfo.firebaseapp.com",
  projectId: "bytesplashinfo",
  storageBucket: "bytesplashinfo.appspot.com",
  messagingSenderId: "138378609506",
  appId: "1:138378609506:web:81be27ebad750ae846a23b",
  measurementId: "G-G1QQCQ6242"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app);

// Export the Firestore database instance
export { db,storage };
