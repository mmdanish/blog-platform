import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MenuIcon from "../assets/menu-icon.svg"

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate()
  const [isOpenMenu, setIsOpenMenu] = React.useState(false)

  const handleLogout = () => {
    logout(navigate);
  }

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/user/home" className="flex items-center font-bold text-xl">
          BLOG STUDIO 
        </Link>

        {/* Desktop Link */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/user/home" className="mr-4 hover:underline">
            Home
          </Link>
          <Link to="/user/create" className="hover:underline">
            Create Post
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Mobile view */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <img src={MenuIcon} alt="Menu Icon" className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isOpenMenu && (
        <div className="md:hidden mt-4 space-y-2 text-center bg-gray-700 rounded-lg p-4">
          <Link
            to="/user/home"
            className="block text-white hover:underline"
            onClick={() => setIsOpenMenu(false)}
          >
            Home
          </Link>
          <Link
            to="/user/create"
            className="block text-white hover:underline"
            onClick={() => setIsOpenMenu(false)}
          >
            Create Post
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsOpenMenu(false);
            }}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
