import "../../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth();

export const login = (user) => {
  return signInWithEmailAndPassword(auth, user.email, user.password).then(
    (res) => {
      return res.user;
    },
  );
};

export const signup = (user) => {
  return createUserWithEmailAndPassword(auth, user.email, user.password).then(
    () => {
      updateProfile(auth.currentUser, { displayName: user.username });
      return true;
    },
  );
};

export const logout = () => {
  return signOut(auth);
};
