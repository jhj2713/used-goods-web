import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/usedGoods" element={<GoodsList />} />
        <Route path="/community" element={<Community />} />
        <Route path="/goodsDetail/:id" element={<GoodsDetail />} />
        <Route path="/boardDetail/:id" element={<BoardDetail />} />
        <Route path="/writeCommunityBoard" element={<WriteForm />} />
        <Route path="/writeGoodsBoard" element={<WriteGoodsForm />} />
        <Route path="/updateGoodsBoard/:id" element={<WriteGoodsForm />} />
        <Route path="/updateBoard/:id" element={<WriteForm />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
