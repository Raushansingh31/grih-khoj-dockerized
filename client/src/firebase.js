// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyDFVXt4BPfuj_IhiUoTyijb92kSxy3jtfY",
  authDomain: "grih-khoj.firebaseapp.com",
  projectId: "grih-khoj",
  storageBucket: "grih-khoj.appspot.com",
  messagingSenderId: "594051968184",
  appId: "1:594051968184:web:d8f853431f3660fe5c984d"
};
//console.log(import.meta.env.VITE_FIREBASE_API_KEY);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);