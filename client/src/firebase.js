// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-52674.firebaseapp.com",
  projectId: "mern-auth-52674",
  storageBucket: "mern-auth-52674.appspot.com",
  messagingSenderId: "437119581844",
  appId: "1:437119581844:web:6a8e411d418c91810c3e81"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);