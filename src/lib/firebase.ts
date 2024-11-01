import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBC2PFwMuZm9UV9WgG6w5bJO8WZ_oi9yl0",
  authDomain: "test-b52ea.firebaseapp.com",
  projectId: "test-b52ea",
  storageBucket: "test-b52ea.appspot.com",
  messagingSenderId: "50100957022",
  appId: "1:50100957022:web:38ce82c2d9ebad204fe9cf",
  measurementId: "G-Z68MLWLGB6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
