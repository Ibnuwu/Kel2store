import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBlCT2ly2sAndElDFhivzufzRsj3KqVe5w",
  authDomain: "kel2store.firebaseapp.com",
  projectId: "kel2store",
  storageBucket: "kel2store.firebasestorage.app",
  messagingSenderId: "882659040441",
  appId: "1:882659040441:web:1dde44620f04f792fb0f68",
  measurementId: "G-EL9ZN88XQD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
