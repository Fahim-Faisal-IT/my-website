import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAHP7ybbKZ7e3krAx4JLvHOUvNkDzffE_Y",
  authDomain: "bitbot-16732.firebaseapp.com",
  projectId: "bitbot-16732",
  storageBucket: "bitbot-16732.appspot.com",
  messagingSenderId: "732402188420",
  appId: "1:732402188420:web:aaf790a441b6dc94dd02d1",
  measurementId: "G-BF0RBLCYZR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
