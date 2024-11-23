// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBAq6w4E359CnY7LkPiumZIVd2Psxt6Hc",
  authDomain: "business-directory-3b76e.firebaseapp.com",
  projectId: "business-directory-3b76e",
  storageBucket: "business-directory-3b76e.appspot.com",
  messagingSenderId: "274486482323",
  appId: "1:274486482323:web:e344fe46cba82c3ddc4466",
  measurementId: "G-JXF80MR49R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);   