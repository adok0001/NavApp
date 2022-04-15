import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { StorageReference } from "firebase/storage";
import { Constants } from "expo-constants";
import { getAuth } from 'firebase/auth';

/// Initializing firebase 
const firebaseConfig = {
  apiKey: "AIzaSyBLAV_iJDhlPMPj1I1Vb7DS0kXd4rXdR_k",
  authDomain: "project-show-fc10f.firebaseapp.com",
  projectId: "project-show-fc10f",
  storageBucket: "project-show-fc10f.appspot.com",
  messagingSenderId: "311366728576",
  appId: "1:311366728576:web:ddc4749b8bdff545571f65",
  measurementId: "G-KWMMSV52RJ"
};

let Firebase;
export var userId = null;
export var signedUser = null;

if (firebase.getApps().length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export const auth = getAuth();

auth.onAuthStateChanged((user) => {
if(user){
  console.log("signed "+user.email);
  console.log("id - "+user.uid);
  userId = user.uid;
}
else 
  console.log("No user signed in")
});



export const firestore = getStorage(Firebase);
  
export const db = getFirestore();
export default Firebase;