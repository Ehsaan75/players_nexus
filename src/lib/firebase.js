// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB1iUR3phvkHIZegd9qr_LtotVou8Wm5o",
  authDomain: "fyproject-55d84.firebaseapp.com",
  projectId: "fyproject-55d84",
  storageBucket: "fyproject-55d84.appspot.com",
  messagingSenderId: "842419690613",
  appId: "1:842419690613:web:a5d102a583df4440696c3c",
  measurementId: "G-9EPMT7R3DS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);