// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyB_aRjjzdgNYLxY73jo_gO7j47zXG5aEp4",
  authDomain: "autohome-2.firebaseapp.com",
  databaseURL: "https://autohome-2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "autohome-2",
  storageBucket: "autohome-2.appspot.com",
  messagingSenderId: "711862652396",
  appId: "1:711862652396:web:c53b299ea485ea792fc4c9",
  measurementId: "G-2P7FMBNQV0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app)

