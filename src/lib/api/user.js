import { firestore } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
} from "firebase/auth";

const auth = getAuth();

export const login = (user) => {
  return signInWithEmailAndPassword(auth, user.email, user.password).then(
    (res) => {
      return res.user;
    },
  );
};

export const checkName = ({ username }) => {
  return firestore
    .collection("user")
    .where("username", "==", username)
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
  return createUserWithEmailAndPassword(auth, user.email, user.password).then(
    () => {
      firestore.collection("user").add(user);
      updateProfile(auth.currentUser, { displayName: user.username });
      return true;
    },
  );
};

export const logout = () => {
  return signOut(auth);
};

export const loadUser = ({ username }) => {
  return firestore
    .collection("user")
    .where("username", "==", username)
    .get()
    .then((res) => {
      return res.docs[0].data();
    });
};

export const updateUser = (newUser) => {
  const user = auth.currentUser;
  return updatePassword(user, newUser.password)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
