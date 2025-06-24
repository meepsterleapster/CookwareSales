import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvQ9OSDQZzH0QKhydXiRjTv_GT4BLnKwU",
  authDomain: "cookwaresale-315b4.firebaseapp.com",
  projectId: "cookwaresale-315b4",
  storageBucket: "cookwaresale-315b4.firebasestorage.app",
  messagingSenderId: "69936343556",
  appId: "1:69936343556:web:f8738af6c17cfb2791a351",
  measurementId: "G-P4RELJELM8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage };
