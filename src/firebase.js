import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBs-HT_7pPYS5GYPQQWNbl_Uz9_u6TMirI",
  authDomain: "todo-app-a6112.firebaseapp.com",
  projectId: "todo-app-a6112",
  storageBucket: "todo-app-a6112.appspot.com",
  messagingSenderId: "533173953360",
  appId: "1:533173953360:web:9e8d2b6fcf8deb16908255",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
