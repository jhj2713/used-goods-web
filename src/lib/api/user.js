import "../../firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

export const login = (user) => {
  return signInWithEmailAndPassword(auth, user.email, user.password).then(
    (res) => {
      return res.user;
    },
  );
};

export const logout = () => {
  return signOut(auth);
};
