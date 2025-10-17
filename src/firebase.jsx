// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// --- THIS IS THE KEY ADDITION ---
// We need to import the authentication functions
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// --- END OF ADDITION ---
import { getAnalytics } from "firebase/analytics";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
// Your web app's Firebase configuration is perfect
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "edtech-platform-25d9d.firebaseapp.com",
  projectId: "edtech-platform-25d9d",
  storageBucket: "edtech-platform-25d9d.appspot.com", // Corrected domain
  messagingSenderId: "214431018899",
  appId: "1:214431018899:web:63e8e5b73a6e19c649c266",
  measurementId: "G-Y11VFCBL3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// --- THESE ARE THE KEY ADDITIONS ---
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// A simple function to handle the entire sign-in flow
export const signInWithGooglePopup = async () => {
  const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
    prompt: 'select_account'
  });
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // Get the all-important ID Token for backend verification
    const idToken = await user.getIdToken();
    return { user, idToken };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};
// --- END OF ADDITION ---

// You can still keep analytics if you plan to use it
const analytics = getAnalytics(app);