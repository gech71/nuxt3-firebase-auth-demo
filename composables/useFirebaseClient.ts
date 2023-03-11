// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
  signInWithEmailAndPassword,
  getIdToken,
  signOut,
  signInWithCustomToken,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5i395x7PyZQDBPSpdrzpzDPQDAAyc4MU",
  authDomain: "hibirbitshibirlink.firebaseapp.com",
  projectId: "hibirbitshibirlink",
  storageBucket: "hibirbitshibirlink.appspot.com",
  messagingSenderId: "1077830998369",
  appId: "1:1077830998369:web:369007817624495d9d8d20",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function useFirebaseClient() {
  const auth = getAuth(app);

  const signUpUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, error: null };
    } catch (error) {
      return { error: error + "", success: false };
    }
  };

  const signInUser = async (email: string, password: string) => {
    await setPersistence(auth, inMemoryPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await getIdToken(userCredential.user);

    const result = await useFetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: { idToken },
    });

    await signOut(auth);
    if (result.error.value) {
      console.log(result.error.value);
    }
    if (result.data.value) {
      const typedResult = result.data.value as { customToken: string };
      const { customToken } = typedResult;
      await signInUserWithCustomToken(customToken);
    }
  };

  const signInUserWithCustomToken = async (customToken: string) => {
    const userCredential = await signInWithCustomToken(auth, customToken);
    const idToken = await getIdToken(userCredential.user);

    const result = await useFetch(
      "http://localhost:5000/auth/setSessionCookie",
      {
        method: "POST",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: { idToken },
      }
    );
    await signOut(auth);
    if (result.error.value) {
      console.error(result.error.value);
    }
    if (result.data.value) {
      console.log(result.data.value);
      const resultX = await useFetch("http://localhost:5000/auth/test", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      console.log(resultX, " resX");
    }
  };

  return {
    app,
    auth,
    signUpUser,
    signInUser,
  };
}
