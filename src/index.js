import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIc4h-T2yDWjhOmlyPSBf69GV8CwaRLDY",
  authDomain: "ig-rmp.firebaseapp.com",
  projectId: "ig-rmp",
  storageBucket: "ig-rmp.appspot.com",
  messagingSenderId: "817408427902",
  appId: "1:817408427902:web:e7d4e3a5e3c857e735952f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


