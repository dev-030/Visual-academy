// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDekkwVZQsOGelsaIbK_3Q6eKE7PMzIv54",
  authDomain: "summer-camp-ec3a9.firebaseapp.com",
  projectId: "summer-camp-ec3a9",
  storageBucket: "summer-camp-ec3a9.appspot.com",
  messagingSenderId: "572742661547",
  appId: "1:572742661547:web:64debc0b74dfaf512b4eee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;