import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAlyTEnxzOl0tuk9pwt95GXd6Xnsgjn4zA",
  authDomain: "man3guy-ee7bb.firebaseapp.com",
  projectId: "man3guy-ee7bb",
  storageBucket: "man3guy-ee7bb.appspot.com",
  messagingSenderId: "747634853420",
  appId: "1:747634853420:web:9b2a7712c7575a6c3e3389"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);