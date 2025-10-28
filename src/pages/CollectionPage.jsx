import React from "react";
import { Link } from "react-router";
import { useBookContext } from "../context/BookContext";
import BookCard from "../components/BookCard";

export default function CollectionPage() {
  const { favorites, removeFavorite } = useBookContext();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 px-4 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
          My Collection
        </h1>
        <p className="text-gray-400 text-sm">
          All the books you’ve added to your collection appear here.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-400 text-lg mb-4">
              You haven’t added any books yet.
            </p>
            <Link
              to="/"
              className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              🔍 Browse Books
            </Link>
          </div>
        ) : (
          <>
            {/* Grid of Saved Books */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((book) => (
                <div
                  key={book.key}
                  className="relative group bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-transform"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFavorite(book.key)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>

                  {/* Book Card */}
                  <BookCard book={book} />
                </div>
              ))}
            </div>

            {/* Info */}
            <p className="text-gray-400 text-center mt-10 text-sm">
              Total saved books:{" "}
              <span className="text-yellow-400 font-semibold">
                {favorites.length}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
