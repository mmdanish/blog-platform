import React, {useState} from "react";
import InputField from "../components/InputField";
import TextareaField from "../components/TextareaField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { toast } from "react-toastify";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/posts",
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
      console.log("Post created", response.data);
      toast.success("Post created successfully!");
      setTitle("");
      setContent("");
      navigate('/user/home')
    } catch (error) {
      // console.error("Error creating post", error);
      toast.error("Error creating post!");
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
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
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
