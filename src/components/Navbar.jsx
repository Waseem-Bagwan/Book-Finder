import React from "react";
import { Link, useLocation } from "react-router";
import { useBookContext } from "../context/BookContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const { favorites } = useBookContext();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        📚 Book Finder
      </Link>

      {/* Links */}
      <div className="space-x-6 text-lg flex items-center">
        <Link
          to="/"
          className={`hover:text-yellow-400 transition ${
            pathname === "/" ? "text-yellow-400" : ""
          }`}
        >
          Home
        </Link>

        <Link
          to="/collection"
          className={`relative hover:text-yellow-400 transition ${
            pathname === "/collection" ? "text-yellow-400" : ""
          }`}
        >
          My Collection
          {/* Badge */}
          {favorites.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {favorites.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
