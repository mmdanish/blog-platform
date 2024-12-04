import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button"; // Import the reusable Button component


const PostCard = ({ post }) => {
  const navigate = useNavigate();

  // const handleEdit = () => {
  //   navigate(`/user/update/${post._id}`);
  // };

  // const handleDelete = () => {
  //   onDelete(post?._id)
  // };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold">{post?.title || "Untitled post"}</h2>
      <p className="text-gray-600">
        By {post?.author?.name || "Unknown Author"}
      </p>
      <p className="text-gray-500 text-sm">
        {new Date(post.timestamp).toLocaleString()}
      </p>
      <p className="mt-2">{post.content.substring(0, 100)}...</p>

      {/* "View More" Button using reusable Button component */}
      <Button
        onClick={() => navigate(`/user/posts/${post._id}`)}
        className="mt-4"
        variant="primary" // Use primary style (blue)
      >
        View More
      </Button>

      {/* {post.isAuthor && (
        <div className="flex space-x-4 mt-2">
          
          <Button onClick={handleEdit} variant="primary">
            Edit
          </Button>

          
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default PostCard;
