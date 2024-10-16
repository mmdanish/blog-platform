import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import TextareaField from "../components/TextareaField";
import axios from "axios";
import Button from "../components/Button";

const UpdatePostPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the post details to pre-fill the form
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/posts/${id}`
        );
        const post = response.data;

        setTitle(post.title);
        setContent(post.content);
        setLoading(false);
      } catch (error) {
        setError("Error fetching post details");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:8000/api/posts/${id}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Post updated successfully");
      navigate(`/posts/${id}`); 
    } catch (error) {
      console.error("Error updating post", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextareaField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          type="submit"
        >
          Update Post
        </Button>
      </form>
    </div>
  );
};

export default UpdatePostPage;
