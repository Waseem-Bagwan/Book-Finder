import React from "react";

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 bg-gray-900/80 rounded-xl shadow-inner px-4 py-2"
    >
      <input
        type="text"
        placeholder="Search books by title..."
        className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500 px-2 py-2 text-lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-5 py-2 rounded-lg transition"
      >
        Search
      </button>
    </form>
  );
}
