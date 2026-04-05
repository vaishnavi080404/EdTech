import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "edtech-skillnest.firebasestorage.app",
  messagingSenderId: "73996814889",
  appId: "1:73996814889:web:ebc100815ce7d80ab46a38"
};

// initialize firebase
const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);


export const signInWithGooglePopup = async () => {
  const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
    prompt: 'select_account'
  });
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const idToken = await user.getIdToken();
    return { user, idToken };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};



const analytics = getAnalytics(app);