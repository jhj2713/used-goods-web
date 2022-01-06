import { firestore } from "../../firebase";

export const saveBoard = (board) => {
  firestore.collection("community").add(board);
};

export const updateBoard = (board) => {
  firestore
    .collection("community")
    .where("id", "==", board.id)
    .get()
    .then((res) => {
      const uid = res.docs[0].id;
      firestore.collection("community").doc(uid).update(board);
    });
};

export const loadBoards = ({ searchValue }) => {
  if (searchValue) {
    return firestore
      .collection("community")
      .orderBy("date", "desc")
      .get()
      .then((res) => {
        const boards = res.docs
          .filter((doc) => doc.data().title.includes(searchValue))
          .map((doc) => doc.data());
        return { boards };
      });
  } else {
    return firestore
      .collection("community")
      .orderBy("date", "desc")
      .get()
      .then((res) => {
        const boards = res.docs.map((doc) => doc.data());
        return { boards };
      });
  }
};

export const deleteBoard = (board) => {
  firestore
    .collection("community")
    .where("id", "==", board.id)
    .get()
    .then((res) => {
      const uid = res.docs[0].id;
      firestore.collection("community").doc(uid).delete();
    });
};

export const loadMyWriteList = ({ user }) => {
  return firestore
    .collection("community")
    .where("userId", "==", user)
    .get()
    .then((res) => {
      return res.docs.map((doc) => doc.data());
    });
};
