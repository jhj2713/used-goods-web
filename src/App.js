import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import GoodsList from "./screens/goodsScreen/GoodsList";
import Community from "./screens/communityScreen/Community";
import BoardDetail from "./screens/BoardDetail";
import GoodsDetail from "./screens/GoodsDetail";
import WriteForm from "./screens/WriteForm";
import Mypage from "./screens/Mypage";
import WriteGoodsForm from "./screens/WriteGoodsForm";
import OtherUserpage from "./screens/OtherUserpage";

function App() {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={
            user === null ? <Login /> : <Navigate replace to="/usedGoods" />
          }
        />
        <Route
          path="/signup"
          element={
            user === null ? <Signup /> : <Navigate replace to="usedGoods" />
          }
        />
        <Route
          path="/usedGoods"
          element={
            user === null ? <Navigate replace to="/login" /> : <GoodsList />
          }
        />
        <Route
          path="/community"
          element={
            user === null ? <Navigate replace to="/login" /> : <Community />
          }
        />
        <Route
          path="/goodsDetail/:id"
          element={
            user === null ? <Navigate replace to="/login" /> : <GoodsDetail />
          }
        />
        <Route
          path="/boardDetail/:id"
          element={
            user === null ? <Navigate replace to="/login" /> : <BoardDetail />
          }
        />
        <Route
          path="/writeCommunityBoard"
          element={
            user === null ? <Navigate replace to="/login" /> : <WriteForm />
          }
        />
        <Route
          path="/writeGoodsBoard"
          element={
            user === null ? (
              <Navigate replace to="/login" />
            ) : (
              <WriteGoodsForm />
            )
          }
        />
        <Route
          path="/updateGoodsBoard/:id"
          element={
            user === null ? (
              <Navigate replace to="/login" />
            ) : (
              <WriteGoodsForm />
            )
          }
        />
        <Route
          path="/updateBoard/:id"
          element={
            user === null ? <Navigate replace to="/login" /> : <WriteForm />
          }
        />
        <Route
          path="/mypage"
          element={
            user === null ? <Navigate replace to="/login" /> : <Mypage />
          }
        />
        <Route
          path="/mypage/usedBoards"
          element={
            user === null ? <Navigate replace to="/login" /> : <Mypage />
          }
        />
        <Route
          path="/mypage/communityBoards"
          element={
            user === null ? <Navigate replace to="/login" /> : <Mypage />
          }
        />
        <Route
          path="/otheruser/:id"
          element={
            user === null ? <Navigate replace to="/login" /> : <OtherUserpage />
          }
        />
        <Route
          path="/otheruser/:id/communityBoards"
          element={
            user === null ? <Navigate replace to="/login" /> : <OtherUserpage />
          }
        />
        <Route
          path="/otheruser/:id/usedBoards"
          element={
            user === null ? <Navigate replace to="/login" /> : <OtherUserpage />
          }
        />
        <Route
          path="*"
          element={
            user === null ? (
              <Navigate replace to="/login" />
            ) : (
              <Navigate replace to="/usedGoods" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
