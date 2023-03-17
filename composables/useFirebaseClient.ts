// Import the functions you need from the SDKs you need
import {
  getAuth,
  createUserWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
  signInWithEmailAndPassword,
  getIdToken,
  signOut,
  signInWithCustomToken,
  updateProfile,
  applyActionCode,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
} from "firebase/auth";

export default function useFirebaseClient() {
  const auth = useNuxtApp().$auth;

  const router = useRouter();

  const signUpUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      await sendEmailVerification(userCredential.user);
      return {
        success: true,
        message: "Email Verification sent. Please verify your email.",
      };
    } catch (error) {
      return {
        success: false,
        message: error + "",
      };
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
      return { idToken, error: null };
    } catch (error) {
      return { idToken: null, error: error + "" };
    }
  };

  const applyUserActionCode = async (oobCode: string) => {
    try {
      await applyActionCode(auth, oobCode);
      return {
        success: true,
        message: "Email Verified. Now You Can Log In To the hibirLink System",
      };
    } catch (error) {
      return {
        success: false,
        message:
          "Your request to verify your email has expired or the link has already been used.",
      };
    }
  };

  const sendUserPasswordResetEmail = async (email: string) => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: "Email Sent Successfully" };
    } catch (error) {
      return { success: false, message: error + "" };
    }
  };

  const confirmUserPasswordReset = async (
    oobCode: string,
    newPassword: string
  ) => {
    const auth = getAuth();

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);

      return {
        success: true,
        message:
          "Password reset successfully. Now You can log in with your new password",
      };
    } catch (error) {
      return {
        success: false,
        message: error + "",
      };
    }
  };

  const signUserOut = async () => {
    await signOut(auth);
  };

  return {
    auth,
    signUpUser,
    signInUser,
    signInUserWithCustomToken,
    signUserOut,
    confirmUserPasswordReset,
    sendUserPasswordResetEmail,
    applyUserActionCode,
  };
}
