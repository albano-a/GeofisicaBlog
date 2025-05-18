import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Post from "../pages/Post";
import SubmitPost from "../pages/SubmitPost";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:slug" element={<Post />} /> {/* add this line */}
      <Route path="/submit" element={<SubmitPost />} />
    </Routes>
  );
}
