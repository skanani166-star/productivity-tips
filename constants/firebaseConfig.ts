import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDV0PCcwFJNhvKaMZX_U7F87AqiB9lL7e4",
  authDomain: "productivity-tips-43f6b.firebaseapp.com",
  projectId: "productivity-tips-43f6b",
  storageBucket: "productivity-tips-43f6b.firebasestorage.app",
  messagingSenderId: "679495362656",
  appId: "1:679495362656:android:a69c25ade06fdd6160fb05"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
