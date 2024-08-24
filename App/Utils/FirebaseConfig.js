// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2Ad7iyyUQ3EkFODH4iyzVIAws-a_piQo",
  authDomain: "my-native-app-40f8f.firebaseapp.com",
  projectId: "my-native-app-40f8f",
  storageBucket: "my-native-app-40f8f.appspot.com",
  messagingSenderId: "483343446259",
  appId: "1:483343446259:web:7e428db5754070c3c98786",
  measurementId: "G-QP7R7GP0MM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
