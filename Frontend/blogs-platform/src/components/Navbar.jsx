import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    logout(navigate);
  }

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="flex items-center font-bold text-xl">
          BLOG STUDIO 
        </Link>
        <div>
          <Link to="/user/home" className="mr-4 hover:underline">
            Home
          </Link>
          
            <>
              <Link to="/user/create" className="mr-4 hover:underline">
                Create Post
              </Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
