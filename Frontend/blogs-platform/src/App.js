import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreatePostPage from "./pages/CreatePostPage";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import LoginPage from "./pages/LoginPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/update/:id" element={<UpdatePostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
