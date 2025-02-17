import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB0zzzQ_4HZoHx6VbU5XaH55HId-M321is",
  authDomain: "quiz-be96f.firebaseapp.com",
  projectId: "quiz-be96f",
  storageBucket: "quiz-be96f.firebasestorage.app",
  messagingSenderId: "239397320720",
  appId: "1:239397320720:web:4702f8bd5f5a565d26b295",
  measurementId: "G-VB4WZW7GFG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, app, storage };