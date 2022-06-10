import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetail from "./pages/MovieDetail";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header/Header";
import "./App.css";
import MovieCategory from "./pages/MovieCategory";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieType" element={<MovieCategory />} />
        <Route path="/movieDetail/:id" element={<MovieDetail />} />
        {/* * đại diện cho tất cả các page không phải trang homepage hoặc movie detail */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
