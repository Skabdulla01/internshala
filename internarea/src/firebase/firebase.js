

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4Tm08emJ2ciBSez0R4kBil6C4zn3R0mA",
  authDomain: "intershala-76322.firebaseapp.com",
  projectId: "intershala-76322",
  storageBucket: "intershala-76322.firebasestorage.app",
  messagingSenderId: "666154673179",
  appId: "1:666154673179:web:7984a218bbfb05d78944be",
  measurementId: "G-FQBCNXF3P8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };