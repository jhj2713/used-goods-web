import "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const login = (user) => {
  return signInWithEmailAndPassword(auth, user.email, user.password).then(
    (res) => {
      return res.user;
    },
  );
};

export const logout = (user) => {
  return { data: null };
};
