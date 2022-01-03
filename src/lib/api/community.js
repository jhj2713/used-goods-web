import { firestore } from "../../firebase";

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
