import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCXeZop1SFxqGWfqxEzu-5eN45y1M9gdWI",
    authDomain: "app-volunteer-4a5b4.firebaseapp.com",
    projectId: "app-volunteer-4a5b4",
    storageBucket: "app-volunteer-4a5b4.appspot.com",
    messagingSenderId: "1018348849161",
    appId: "1:1018348849161:web:aebdbeae18dfad1c8ad0d8",
    measurementId: "G-JFHBY596Z3"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app);
export default app;