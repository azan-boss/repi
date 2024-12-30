// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0E37uAZT-_Nq6rzf_i7vqGwnPP7AltVE",
  authDomain: "github-93cb0.firebaseapp.com",
  projectId: "github-93cb0",
  storageBucket: "github-93cb0.firebasestorage.app",
  messagingSenderId: "556886591413",
  appId: "1:556886591413:web:6abc545f9da9ea36743bfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {auth}