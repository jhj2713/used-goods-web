import { firestore } from "../../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

export const login = (user) => {
  return signInWithEmailAndPassword(auth, user.email, user.password).then(
    (res) => {
      return res.user;
    },
  );
};

export const doublecheckEmail = (user) => {
  return firestore
    .collection("user")
    .where("email", "==", user.email)
    .get()
    .then((res) => {
      if (res.docs.length > 0) {
        return false;
      } else {
        return true;
      }
    });
};

export const signup = (user) => {
  firestore.collection("user").add(user);
};

export const logout = () => {
  return signOut(auth);
};
