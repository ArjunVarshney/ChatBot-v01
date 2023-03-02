import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwlf8fomOb0xBYZSa7apDWa9hy2P2HVDM",
  authDomain: "chatbot-v01-b6989.firebaseapp.com",
  projectId: "chatbot-v01-b6989",
  storageBucket: "chatbot-v01-b6989.appspot.com",
  messagingSenderId: "685795789588",
  appId: "1:685795789588:web:8c61527ae7239677e45001",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
