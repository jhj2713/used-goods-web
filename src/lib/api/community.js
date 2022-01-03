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

export const loadBoards = () => {
  return firestore
    .collection("community")
    .orderBy("date", "desc")
    .limit(7)
    .get()
    .then((res) => {
      const boards = res.docs.map((doc) => doc.data());
      const lastDoc = res.docs[res.docs.length - 1];
      let isLast = false;
      if (res.size < 7) {
        isLast = true;
      }
      return { boards, lastDoc, isLast };
    });
};

export const paginationNextBoard = ({ lastDoc }) => {
  return firestore
    .collection("community")
    .orderBy("date", "desc")
    .startAfter(lastDoc)
    .limit(7)
    .get()
    .then((res) => {
      const boards = res.docs.map((doc) => doc.data());
      const lastDoc = res.docs[res.docs.length - 1];
      let isLast = false;
      if (res.size < 7) {
        isLast = true;
      }
      return { boards, lastDoc, isLast };
    });
};

export const paginationPrevBoard = ({ lastDoc }) => {
  return firestore
    .collection("community")
    .orderBy("date", "desc")
    .endBefore(lastDoc)
    .limit(7)
    .get()
    .then((res) => {
      const boards = res.docs.map((doc) => doc.data());
      const lastDoc = res.docs[res.docs.length - 1];
      let isFirst = false;
      if (res.size < 7) {
        isFirst = true;
      }
      return { boards, lastDoc, isFirst };
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
