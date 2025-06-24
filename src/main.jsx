import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from './Components/App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

import "./CSS/UnifiedCSS.css"; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvQ9OSDQZzH0QKhydXiRjTv_GT4BLnKwU",
  authDomain: "cookwaresale-315b4.firebaseapp.com",
  projectId: "cookwaresale-315b4",
  storageBucket: "cookwaresale-315b4.firebasestorage.app",
  messagingSenderId: "69936343556",
  appId: "1:69936343556:web:f8738af6c17cfb2791a351",
  measurementId: "G-P4RELJELM8"
};


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
