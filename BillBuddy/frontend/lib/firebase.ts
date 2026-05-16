// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIhmgkE_nMkGANPHOtmeVLPdZJUGQscH4",
  authDomain: "billbuddy-d4ec3.firebaseapp.com",
  projectId: "billbuddy-d4ec3",
  storageBucket: "billbuddy-d4ec3.firebasestorage.app",
  messagingSenderId: "857298120370",
  appId: "1:857298120370:web:c88c2ed1c29768e63763ab",
  measurementId: "G-03CB7206EK"
}

// Initialize Firebase
export const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0]

export const db = getFirestore(app)
