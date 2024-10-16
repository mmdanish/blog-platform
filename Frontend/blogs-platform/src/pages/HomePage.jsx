import React, {useState, useEffect} from "react";
import PostCard from "../components/PostCard";
import axios from "axios";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching posts:", error);
      });
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default HomePage;
