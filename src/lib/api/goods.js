import { firestore } from "../../firebase";

export const saveGoods = (board) => {
  firestore.collection("goods").add(board);
};

export const updateGoods = (board) => {
  firestore
    .collection("goods")
    .where("id", "==", board.id)
    .get()
    .then((res) => {
      const uid = res.docs[0].id;
      firestore.collection("goods").doc(uid).update(board);
    });
};

export const loadGoods = () => {
  return firestore
    .collection("goods")
    .orderBy("date", "desc")
    .limit(6)
    .get()
    .then((res) => {
      const goodsBoards = res.docs.map((doc) => doc.data());
      const lastDoc = res.docs[res.docs.length - 1];
      let isLast = false;
      if (res.size < 6) {
        isLast = true;
      }
      return { goodsBoards, lastDoc, isLast };
    });
};

export const paginationNextBoard = ({ lastDoc }) => {
  return firestore
    .collection("goods")
    .orderBy("date", "desc")
    .startAfter(lastDoc)
    .limit(6)
    .get()
    .then((res) => {
      const goodsBoards = res.docs.map((doc) => doc.data());
      const lastDoc = res.docs[res.docs.length - 1];
      let isLast = false;
      if (res.size < 6) {
        isLast = true;
      }
      return { goodsBoards, lastDoc, isLast };
    });
};

export const paginationPrevBoard = ({ lastDoc }) => {
  return firestore
    .collection("goods")
    .orderBy("date", "desc")
    .endBefore(lastDoc)
    .limit(6)
    .get()
    .then((res) => {
      const goodsBoards = res.docs.map((doc) => doc.data());
      const lastDoc = res.docs[res.docs.length - 1];
      let isLast = true;
      if (res.size >= 6) {
        isLast = false;
      }
      return { goodsBoards, lastDoc, isLast };
    });
};

export const deleteGoods = (board) => {
  firestore
    .collection("goods")
    .where("id", "==", board.id)
    .get()
    .then((res) => {
      const uid = res.docs[0].id;
      firestore.collection("goods").doc(uid).delete();
    });
};

export const loadMyGoodsList = (user) => {
  return firestore
    .collection("goods")
    .where("userId", "==", user.displayName)
    .get()
    .then((res) => {
      return res.docs.map((doc) => doc.data());
    });
};
