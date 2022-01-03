import { firestore } from "../../firebase";

export const save = (board) => {
  firestore.collection("community").add(board);
};

export const update = (board) => {
  firestore
    .collection("community")
    .where("id", "==", board.id)
    .get()
    .then((res) => {
      const uid = res.docs[0].id;
      firestore.collection("community").doc(uid).update(board);
    });
};

export const load = () => {
  let boards = [];
  return firestore
    .collection("community")
    .orderBy("date")
    .limit(7)
    .get()
    .then((res) => {
      res.docs.forEach((doc) => {
        boards.push(doc.data());
      });
      return boards;
    });
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
