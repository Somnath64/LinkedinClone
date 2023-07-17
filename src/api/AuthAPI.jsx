import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
    let response = await createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const SignOutAPI = async () => {
  try {
    signOut(auth);
    localStorage.clear();
  } catch (err) {
    return err;
  }
};
