import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button"; // Import the reusable Button component

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="border border-gray-300 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300 mb-4 bg-white">
      {/* Post Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {post?.title || "Untitled Post"}
      </h2>

      {/* Author and Timestamp */}
      <div className="text-sm text-gray-500 mb-4">
        <p>By {post?.author?.name || "Unknown Author"}</p>
        <p>{new Date(post.timestamp).toLocaleString()}</p>
      </div>

      {/* Post Content Preview */}
      <p className="text-gray-700 text-sm line-clamp-3 mb-4">
        {post?.content.substring(0, 100) || "No content available..."}
      </p>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button
          onClick={() => navigate(`/user/posts/${post._id}`)}
          className="text-blue-500 hover:underline text-sm font-medium"
        >
          View More
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
