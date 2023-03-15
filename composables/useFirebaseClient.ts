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

  const router = useRouter();

  const signUpUser = async (email: string, password: string) => {
    try {
      await setPersistence(auth, inMemoryPersistence);
      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      return { success: true, error: null };
    } catch (error) {
      return { error: error + "", success: false };
    }
  };

  const signInUser = async (email: string, password: string) => {
    try {
      await setPersistence(auth, inMemoryPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await getIdToken(userCredential.user);
      await signOut(auth);
      return { idToken, error: null };
    } catch (error) {
      return { idToken: null, error: error + "" };
    }
  };

  const signInUserWithCustomToken = async (customToken: string) => {
    try {
      await setPersistence(auth, inMemoryPersistence);
      const userCredential = await signInWithCustomToken(auth, customToken);
      const idToken = await getIdToken(userCredential.user);
      await signOut(auth);
      return { idToken, error: null };
    } catch (error) {
      return { idToken: null, error: error + "" };
    }
  };

  return {
    app,
    auth,
    signUpUser,
    signInUser,
    signInUserWithCustomToken,
  };
}
