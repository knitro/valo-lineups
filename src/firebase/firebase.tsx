import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

////////////////////////////////////////////////////////
// Initialisation
////////////////////////////////////////////////////////

export const firebaseConfig = {
  apiKey: "AIzaSyBaRiqIKe65wUS3-aRXRjgqc0xvJWLM_Qc",
  authDomain: "valo-lineups-e3565.firebaseapp.com",
  projectId: "valo-lineups-e3565",
  storageBucket: "valo-lineups-e3565.appspot.com",
  messagingSenderId: "815695938816",
  appId: "1:815695938816:web:9797e80b8b5f3b9cd99fe5",
  databaseURL:
    "https://valo-lineups-e3565-default-rtdb.asia-southeast1.firebasedatabase.app",
  // This is needed for RTDB if region is anything other than US Central 1
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////

export const auth = getAuth(firebaseApp);
export const fs = getFirestore(firebaseApp);
export const db = getDatabase(firebaseApp);
