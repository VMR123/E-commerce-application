// Import required classes from Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6BsB5neNBVH3SDrJdAUfBvHph7MceKH4",
    authDomain: "ecommeerce-a6c2c.firebaseapp.com",
    databaseURL: "https://ecommeerce-a6c2c-default-rtdb.firebaseio.com",
    projectId: "ecommeerce-a6c2c",
    storageBucket: "ecommeerce-a6c2c.appspot.com",
    messagingSenderId: "1075832413721",
    appId: "1:1075832413721:web:25896935bd92eb32721488"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
