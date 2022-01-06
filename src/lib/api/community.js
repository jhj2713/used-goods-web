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
        return boards;
      });
  } else {
    return firestore
      .collection("community")
      .orderBy("date", "desc")
      .get()
      .then((res) => {
        const boards = res.docs.map((doc) => doc.data());
        return boards;
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

export const saveComment = ({ comment, board }) => {
  return firestore
    .collection("community")
    .where("id", "==", board.id)
    .get()
    .then((res) => {
      const uid = res.docs[0].id;
      return firestore
        .collection("community")
        .doc(uid)
        .collection("comments")
        .add(comment)
        .then(() => {
          return firestore
            .collection("community")
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
    .collection("community")
    .where("id", "==", boardId)
    .get()
    .then((res) => {
      const uid = res.docs[0].id;
      return firestore
        .collection("community")
        .doc(uid)
        .collection("comments")
        .get()
        .then((res) => {
          return res.docs.map((doc) => doc.data());
        });
    });
};

export const deleteComment = ({ boardId, id }) => {
  firestore
    .collection("community")
    .where("id", "==", boardId)
    .get()
    .then((res) => {
      const uid = res.docs[0].id;
      firestore
        .collection("community")
        .doc(uid)
        .collection("comments")
        .where("id", "==", id)
        .get()
        .then((res) => {
          const commentId = res.docs[0].id;
          firestore
            .collection("community")
            .doc(uid)
            .collection("comments")
            .doc(commentId)
            .delete();
        });
    });
};
