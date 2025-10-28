import React, { useEffect, useState } from "react";
import { useBookContext } from "../context/BookContext";
import { useParams, Link } from "react-router";
import axios from "axios";

export default function BookDetailsPage() {
  const { addFavorite, removeFavorite, isFavorite } = useBookContext();
  const { id } = useParams(); // get ID from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
        setBook(res.data);
      } catch (err) {
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950 text-yellow-400">
        <div className="animate-spin h-10 w-10 border-4 border-yellow-400 border-t-transparent rounded-full"></div>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 bg-gray-900 min-h-screen pt-10">
        {error}
      </p>
    );

  const coverUrl = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "https://via.placeholder.com/200x300?text=No+Cover";

  const isFav = isFavorite(`/works/${id}`);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 px-4 py-10">
      {/* Back Link */}
      <div className="max-w-5xl mx-auto mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-yellow-400 hover:text-yellow-300 text-sm transition"
        >
          ← Back to Search
        </Link>
      </div>

      {/* Book Details Container */}
      <div className="max-w-5xl mx-auto bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-10">
        {/* Cover Image */}
        <div className="flex-shrink-0 self-center md:self-start">
          <img
            src={coverUrl}
            alt={book.title}
            className="w-56 h-80 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Book Info */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-yellow-400">
            {book.title}
          </h1>

          {book.description && (
            <p className="text-gray-300 leading-relaxed mb-5 text-sm md:text-base">
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          {/* Favorite Button */}
          <button
            onClick={() =>
              isFav
                ? removeFavorite(`/works/${id}`)
                : addFavorite({
                    key: `/works/${id}`,
                    title: book.title,
                    author_name: book.authors
                      ? book.authors.map((a) => a.name)
                      : ["Unknown"],
                    cover_i: book.covers ? book.covers[0] : null,
                    first_publish_year: book.first_publish_date || "N/A",
                  })
            }
            className={`px-5 py-2.5 font-semibold rounded-lg transition-all ${
              isFav
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
            }`}
          >
            {isFav ? "Remove from Collection" : "Add to Collection"}
          </button>

          {/* Metadata */}
          <div className="mt-6 space-y-2 text-sm md:text-base">
            <p className="text-gray-400">
              <span className="font-semibold text-gray-300">
                First Published:
              </span>{" "}
              {book.first_publish_date || "Unknown"}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold text-gray-300">Subjects:</span>{" "}
              {book.subjects ? book.subjects.slice(0, 6).join(", ") : "N/A"}
            </p>
          </div>

          {/* Open Library Link */}
          <a
            href={`https://openlibrary.org/works/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-5 text-yellow-400 hover:text-yellow-300 underline text-sm md:text-base transition"
          >
            View on OpenLibrary →
          </a>
        </div>
      </div>
    </div>
  );
}
