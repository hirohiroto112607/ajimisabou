// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsJZuZq3wXYCx4TJBX3UXwefHdcEtCMVA",
  authDomain: "ajimisabou.firebaseapp.com",
  projectId: "ajimisabou",
  storageBucket: "ajimisabou.firebasestorage.app",
  messagingSenderId: "299166107755",
  appId: "1:299166107755:web:f0c916bb1d23f7b333892e",
  measurementId: "G-BCP73VP48K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
