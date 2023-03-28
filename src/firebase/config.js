import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfk9e21jsHfpuydh-HBEv3uJkUzbnVE4U",
  authDomain: "social-media-app-beta-012023.firebaseapp.com",
  projectId: "social-media-app-beta-012023",
  storageBucket: "social-media-app-beta-012023.appspot.com",
  messagingSenderId: "1011906246486",
  appId: "1:1011906246486:web:d60dffcbd712a1865388f7",
  measurementId: "G-07FY7X69T1",
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Initialize Firebase Authentication and get a reference to the service
export const authFirebase = getAuth(initializeApp(firebaseConfig));
// export const db = getFirestore(initializeApp(firebaseConfig));
// export const storage = getStorage(initializeApp(firebaseConfig));
