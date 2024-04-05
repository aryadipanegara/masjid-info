import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVXp9RGaNDuaRZ4YJ4sX8H0TwT6VTU5Io",
  authDomain: "masjid-info-418412.firebaseapp.com",
  projectId: "masjid-info-418412",
  storageBucket: "masjid-info-418412.appspot.com",
  messagingSenderId: "425644743845",
  appId: "1:425644743845:web:e535a1362ef6e3d345c14c",
  measurementId: "G-ZX7BET6Y1L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
