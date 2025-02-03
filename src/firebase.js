// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBOVdU8ZP-mCBKOrBcIBpLcpV6ouJ6YOw",
  authDomain: "finance-tracker-96fe8.firebaseapp.com",
  projectId: "finance-tracker-96fe8",
  storageBucket: "finance-tracker-96fe8.firebasestorage.app",
  messagingSenderId: "832217811299",
  appId: "1:832217811299:web:957dd3cf5a3c18619beb56",
  measurementId: "G-4LTS12WPZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };