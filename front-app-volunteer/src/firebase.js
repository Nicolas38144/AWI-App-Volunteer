import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyALWK6gF5zolh7jIQSkVFlmlwre6fD5N6M",
    authDomain: "app-volunteer-8e762.firebaseapp.com",
    projectId: "app-volunteer-8e762",
    storageBucket: "app-volunteer-8e762.appspot.com",
    messagingSenderId: "508102253993",
    appId: "1:508102253993:web:a9f7c179db79040596b8b8",
    measurementId: "G-0NTTDY771Z"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app);
export default app;