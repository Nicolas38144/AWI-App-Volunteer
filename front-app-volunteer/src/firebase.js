import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOZrrLYQrZzz4slV1DRw3rcLhXmTNpPFY",
  authDomain: "app-volunteer-43d2c.firebaseapp.com",
  projectId: "app-volunteer-43d2c",
  storageBucket: "app-volunteer-43d2c.appspot.com",
  messagingSenderId: "24773464092",
  appId: "1:24773464092:web:465282357df337d3464fd9",
  measurementId: "G-BPDZWKT4G0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app);
export default app;