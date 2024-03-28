// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlyTEnxzOl0tuk9pwt95GXd6Xnsgjn4zA",
  authDomain: "man3guy-ee7bb.firebaseapp.com",
  projectId: "man3guy-ee7bb",
  storageBucket: "man3guy-ee7bb.appspot.com",
  messagingSenderId: "747634853420",
  appId: "1:747634853420:web:9b2a7712c7575a6c3e3389"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();