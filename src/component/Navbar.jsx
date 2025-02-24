import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "student") {
      navigate("/dashboard");
    } else if (user.role === "instructor") {
      navigate("/instructor/dashboard");
    }
    setIsMenuOpen(false); 
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="eLearning Logo" className="h-10 w-12" />
          <span className="text-2xl font-semibold dark:text-white">
            eLearning
          </span>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-gray-600 rounded-lg focus:outline-none dark:text-gray-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link
              to="/"
              className="text-gray-800 dark:text-white hover:text-blue-700 dark:hover:text-blue-400"
            >
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={handleDashboardClick}
              className="text-gray-800 dark:text-white hover:text-blue-700 dark:hover:text-blue-400"
            >
              Dashboard
            </button>
          </li>
          <li>
            <Link
              to="/profile"
              className="text-gray-800 dark:text-white hover:text-blue-700 dark:hover:text-blue-400"
            >
              Profile
            </Link>
          </li>
          {user ? (
            <>
              <span className="hidden lg:inline text-blue-700 dark:text-blue-300">
                Welcome, {user.userName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800">
                Login
              </button>
            </Link>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800">
          <ul className="flex flex-col items-center py-4 space-y-4">
            <li>
              <Link
                to="/"
                className="text-gray-800 dark:text-white hover:text-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={handleDashboardClick}
                className="text-gray-800 dark:text-white hover:text-blue-700"
              >
                Dashboard
              </button>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-gray-800 dark:text-white hover:text-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </li>
            {user ? (
              <>
                <span className="text-blue-700 dark:text-blue-800">
                  Welcome, {user.userName}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800"
                >
                  Login
                </button>
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
