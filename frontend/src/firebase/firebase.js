// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB-cWeWdy3AWrAOXFTlB9GhL26YAtAtgY",
  authDomain: "login-auth-dac22.firebaseapp.com",
  projectId: "login-auth-dac22",
  storageBucket: "login-auth-dac22.firebasestorage.app",
  messagingSenderId: "33048482598",
  appId: "1:33048482598:web:46ff709ef1fd5b944c67e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };