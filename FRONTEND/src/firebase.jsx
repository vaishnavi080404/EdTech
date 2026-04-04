import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "edtech-platform-25d9d.firebaseapp.com",
  projectId: "edtech-platform-25d9d",
  storageBucket: "edtech-platform-25d9d.appspot.com",
  messagingSenderId: "214431018899",
  appId: "1:214431018899:web:63e8e5b73a6e19c649c266",
  measurementId: "G-Y11VFCBL3T"
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