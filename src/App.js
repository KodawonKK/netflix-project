import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

// 홈페이지
// 영화 전체 보여주는 페이지 (검색)
// 영화 디테일 페이지
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}></Route>
    </Routes>
  );
}

export default App;
