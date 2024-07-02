import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBogO_tAppjgPmwyjXOr7dd9bh0yA4jZqM",
  authDomain: "e-commerce-89144.firebaseapp.com",
  projectId: "e-commerce-89144",
  storageBucket: "e-commerce-89144.appspot.com",
  messagingSenderId: "404810197372",
  appId: "1:404810197372:web:60dacfb82568f030d95cf9",
};
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireDB = getFirestore(app);
const storage = getStorage(app);
export { fireDB, auth, storage };
