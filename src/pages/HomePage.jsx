import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ResultsGrid from "../components/ResultsGrid";
import useDebounce from "../hooks/useDebounce";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setBooks([]);
      setNumFound(0);
      return;
    }

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("https://openlibrary.org/search.json", {
          params: { title: debouncedQuery, page },
        });
        setBooks(res.data.docs || []);
        setNumFound(res.data.numFound || 0);
      } catch (err) {
        setError("Failed to fetch books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedQuery, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100 pb-10">
      {/* HEADER */}
      <header className="py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          📚 Book Finder
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Discover your next favorite book instantly.
        </p>
      </header>

      {/* SEARCH BAR */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-gray-800/70 backdrop-blur-md p-4 rounded-2xl shadow-lg">
          <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
        </div>
      </div>

      {/* RESULTS */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-yellow-400 border-t-transparent rounded-full"></div>
          </div>
        )}

        {error && <p className="text-center text-red-400 mt-10">{error}</p>}

        {!loading && !error && books.length > 0 && (
          <>
            <p className="text-gray-400 mb-4 text-sm text-center">
              Showing {books.length} of {numFound.toLocaleString()} results
            </p>

            <ResultsGrid books={books} />

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition disabled:opacity-40"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ◀ Prev
              </button>
              <span className="text-gray-400">
                Page <span className="text-yellow-400 font-semibold">{page}</span>
              </span>
              <button
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition"
                onClick={() => setPage((p) => p + 1)}
              >
                Next ▶
              </button>
            </div>
          </>
        )}

        {!loading && !error && !books.length && debouncedQuery && (
          <p className="text-center text-gray-500 mt-20">
            No books found for "<span className="text-yellow-400">{debouncedQuery}</span>".
          </p>
        )}
      </div>
    </div>
  );
}
