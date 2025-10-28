import React from "react";
import { Link } from "react-router";
import { useBookContext } from "../context/BookContext";

export default function BookCard({ book }) {
  const { addFavorite, removeFavorite, isFavorite } = useBookContext();

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/128x180?text=No+Cover";

  const workId = book.key.split("/").pop();
  const favorite = isFavorite(book.key);

  const toggleFavorite = (e) => {
    e.preventDefault();
    favorite ? removeFavorite(book.key) : addFavorite(book);
  };

  return (
    <Link to={`/book/${workId}`}>
      <div className="bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-transform relative group">
        {/* Star Button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 text-xl transition-transform ${
            favorite
              ? "text-yellow-400 scale-110"
              : "text-gray-400 hover:text-yellow-400 hover:scale-110"
          }`}
          title={favorite ? "Remove from Collection" : "Add to Collection"}
        >
          ★
        </button>

        <img
          src={coverUrl}
          alt={book.title}
          className="h-64 w-full object-cover group-hover:opacity-90 transition"
        />

        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-100 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {book.first_publish_year || "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}
