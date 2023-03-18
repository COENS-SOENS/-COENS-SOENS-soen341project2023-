// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import firebase from "./firebase";
import {getStorage} from "firebase/storage"
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firebase cloud messaging. 
export const messaging = getMessaging(app);
getToken(messaging, {vapidKey:"AAAAJSh2LeI:APA91bHyDjH3FuQMVk1-Oh21La4ZkmfHMukbiHA_3gAot-WNEkIDi2EXAG-Wq2SMocVPtiHDH9CFFC_PyVe8GsX2xl4TfEgqoqabGnBplis1IkS6TVYAbQnUyNjiKaHhMAMkAGRA820p"}).then((currentToken) =>{
  if (currentToken) {

  } else {
    console.log('No registration token available');
  }
}).catch((err) => {
  console.log('An error occured while tertieving token', err);
});
 
//const analytics = getAnalytics(app);
export const firestore = getFirestore(app);

export const auth = getAuth();
export default app;
export const storage = getStorage(app);




//------------------------------------------------
