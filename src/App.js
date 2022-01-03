import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import GoodsList from "./screens/goodsScreen/GoodsList";
import Community from "./screens/communityScreen/Community";
import BoardDetail from "./screens/BoardDetail";
import WriteForm from "./screens/WriteForm";
import Mypage from "./screens/Mypage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/usedGoods" element={<GoodsList />} />
        <Route path="/community" element={<Community />} />
        <Route path="/boardDetail" element={<BoardDetail />} />
        <Route path="/writeCommunityBoard" element={<WriteForm />} />
        <Route path="/writeGoodsBoard" element={<WriteForm />} />
        <Route path="/updateBoard" element={<WriteForm />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
