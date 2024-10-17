// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIwkNBm9ajrZZ6je6o5JahukaVurhKFaQ",
  authDomain: "fire4blog.firebaseapp.com",
  databaseURL: "https://fire4blog-default-rtdb.firebaseio.com",
  projectId: "fire4blog",
  storageBucket: "fire4blog.appspot.com",
  messagingSenderId: "591429070983",
  appId: "1:591429070983:web:228d44bdfe66a634e44822",
  measurementId: "G-2TW7B8EEH1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, analytics, storage, auth };
