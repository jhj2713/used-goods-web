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

export const loadGoods = ({ searchValue }) => {
  if (searchValue) {
    return firestore
      .collection("goods")
      .orderBy("date", "desc")
      .get()
      .then((res) => {
        const goodsBoards = res.docs
          .filter((doc) => doc.data().title.includes(searchValue))
          .map((doc) => doc.data());
        return goodsBoards;
      });
  } else {
    return firestore
      .collection("goods")
      .orderBy("date", "desc")
      .get()
      .then((res) => {
        const goodsBoards = res.docs.map((doc) => doc.data());
        return goodsBoards;
      });
  }
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

export const loadMyGoodsList = ({ user }) => {
  return firestore
    .collection("goods")
    .where("userId", "==", user)
    .get()
    .then((res) => {
      return res.docs.map((doc) => doc.data());
    });
};

export const saveComment = ({ comment, board }) => {
  return firestore
    .collection("goods")
    .where("id", "==", board.id)
    .get()
    .then((res) => {
      const uid = res.docs[0].id;
      return firestore
        .collection("goods")
        .doc(uid)
        .collection("comments")
        .add(comment)
        .then(() => {
          return firestore
            .collection("goods")
            .doc(uid)
            .collection("comments")
            .get()
            .then((res) => {
              return res.docs.map((doc) => doc.data());
            });
        });
    });
};

export const loadComments = ({ boardId }) => {
  return firestore
    .collection("goods")
    .where("id", "==", boardId)
    .get()
    .then((res) => {
      const uid = res.docs[0].id;
      return firestore
        .collection("goods")
        .doc(uid)
        .collection("comments")
        .get()
        .then((res) => {
          return res.docs.map((doc) => doc.data());
        });
    });
};
