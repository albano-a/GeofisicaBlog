import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Posts from "../components/Posts";
import PostDetail from "../components/PostDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:slug" element={<PostDetail />} />
    </Routes>
  );
}
