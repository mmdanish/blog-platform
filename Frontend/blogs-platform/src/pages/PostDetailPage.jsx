import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/posts/${id}`
        );
        setPost(response.data);
      } catch (err) {
        setError("Error fetching post details");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Post deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting post", error);
      setError("Failed to delete the post.");
    }
  };

  const handleEdit = () => {
    navigate(`/update/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {post && (
        <>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="mb-2">By {post.author?.name || "Unknown Author"}</p>
          <p className="mb-4">{post.content}</p>

          {user && post && post.author && user.userId === post.author._id && (
            <div className="flex space-x-4">
              <Button onClick={handleEdit}>Edit Post</Button>
              <Button onClick={handleDelete} variant="danger">
                Delete Post
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostDetailPage;
