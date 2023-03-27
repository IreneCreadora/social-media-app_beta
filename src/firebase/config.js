import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import "firebase/storage";
// import "firebase/firestore";

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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
