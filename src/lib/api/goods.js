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
  let boards = [];
  return firestore
    .collection("goods")
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
