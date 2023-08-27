import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzqdUAZYpwzdehbYpG0H7wOeF3-QQnadA",
  authDomain: "auth-order-app.firebaseapp.com",
  projectId: "auth-order-app",
  storageBucket: "auth-order-app.appspot.com",
  messagingSenderId: "650308942679",
  appId: "1:650308942679:web:6b967140ab610d60919c12",
  measurementId: "G-DK8XDXGK63",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
