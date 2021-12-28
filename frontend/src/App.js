import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import GoodsList from "./screens/goodsScreen/GoodsList";
import Community from "./screens/communityScreen/Community";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/usedGoods" element={<GoodsList />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </div>
  );
}

export default App;
