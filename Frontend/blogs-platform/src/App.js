import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import LoginPage from "./pages/LoginPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/">
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/user" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="create" element={<CreatePostPage />} />
          <Route path="posts/:id" element={<PostDetailPage />} />
          <Route path="update/:id" element={<UpdatePostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
