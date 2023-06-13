import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

////////////////////////////////////////////////////////
// Initialisation
////////////////////////////////////////////////////////

export const firebaseConfig = {
  apiKey: "AIzaSyB0_vHkBQ3flyvNLDh3s8eqDEXBdZsgdm8",
  authDomain: "valups.firebaseapp.com",
  projectId: "valups",
  storageBucket: "valups.appspot.com",
  messagingSenderId: "968687293891",
  appId: "1:968687293891:web:364b73f8e8f83a48fcd976",
  databaseURL:
    // This is needed for RTDB if region is anything other than US Central 1
    "https://valups-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////

export const auth = getAuth(firebaseApp);
export const fs = getFirestore(firebaseApp);
export const db = getDatabase(firebaseApp);
