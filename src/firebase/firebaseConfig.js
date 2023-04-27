// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjD5vpTKJ3PWiHshuM74kxJ6qlR4EM9fo",
  authDomain: "desk-tools-plus.firebaseapp.com",
  projectId: "desk-tools-plus",
  storageBucket: "desk-tools-plus.appspot.com",
  messagingSenderId: "555185827438",
  appId: "1:555185827438:web:c1b1ec25a823d7595dc07f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);