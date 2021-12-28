import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
