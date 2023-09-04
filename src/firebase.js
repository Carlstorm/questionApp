// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDCkxHGEoWIEIn-8_pU-IAA-L91uAV52hM",
    authDomain: "questiondb-52931.firebaseapp.com",
    projectId: "questiondb-52931",
    storageBucket: "questiondb-52931.appspot.com",
    messagingSenderId: "1043605411032",
    appId: "1:1043605411032:web:c9909dfa05ade42a50b3ad"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
const db = getFirestore(app);
export { db }