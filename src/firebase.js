import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDImGqww3iaHaZU48PIjbXvo2A-GjLe0lE",
    authDomain: "twitterclone-66b3f.firebaseapp.com",
    projectId: "twitterclone-66b3f",
    storageBucket: "twitterclone-66b3f.firebasestorage.app",
    messagingSenderId: "86496102065",
    appId: "1:86496102065:web:b63be10f6d216607bcc490",
    measurementId: "G-7XEBEF1TE5"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);