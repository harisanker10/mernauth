import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBYF2oBXM_RL5QWugSVzEWvYJ5XyAGaSs",
  authDomain: "practice-659b3.firebaseapp.com",
  projectId: "practice-659b3",
  storageBucket: "practice-659b3.appspot.com",
  messagingSenderId: "601964225504",
  appId: "1:601964225504:web:55ec9620a999a3c45d4185",
  measurementId: "G-9EC9K41XK9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
