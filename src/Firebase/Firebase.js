import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import {getDatabase,} from 'firebase/database'
import 'firebase/auth'
import { getDatabase } from 'firebase/database';
// import app from 'firebase/app';
import 'firebase/database'; 


const firebaseConfig = {
    apiKey: "AIzaSyCZs-gJ1zRYhOA0Usvpoz6KvFlOjm_J0NU",
    authDomain: "price-comparison-9a3a6.firebaseapp.com",
    projectId: "price-comparison-9a3a6",
    storageBucket: "price-comparison-9a3a6.appspot.com",
    messagingSenderId: "805322404998",
    appId: "1:805322404998:web:fcf926f04354f887ddcd07",
    measurementId: "G-58747TW3PT"
  };
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

export { app, database };


