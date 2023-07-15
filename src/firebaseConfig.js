// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7iaODVmoGm8-ipU9wtqCYqCZX9S2YPEQ",
  authDomain: "linkedin-clone-f0fd6.firebaseapp.com",
  projectId: "linkedin-clone-f0fd6",
  storageBucket: "linkedin-clone-f0fd6.appspot.com",
  messagingSenderId: "209516547776",
  appId: "1:209516547776:web:23f808bda126ddc6d06725",
  measurementId: "G-D5BT57MJLC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore,storage };
