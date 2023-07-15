import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginApi = (email, password) => {
  try {
    let response = signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default LoginApi;

export const SignUpAPI = async (email, password) => {
  try {
    console.log("response");
    let response = await createUserWithEmailAndPassword(auth, email, password);
    console.log(response+"line 26");
    return response;
  } catch (err) {
    console.log(err);
    throw err;
    // console.log(err);
  }
};

export const GoogleSigninAPI = async () => {
  try {
    let googleProvider = new GoogleAuthProvider();
    let response = signInWithPopup(auth, googleProvider);
    return response;
  } catch (err) {
    return err;
    // console.log(err);
  }
};

export const SignOutAPI = async () => {
  try {
    signOut(auth);
    localStorage.clear();
  } catch (err) {
    return err;
    // console.log(err);
  }
};
