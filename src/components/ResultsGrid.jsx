import React from "react";
import BookCard from "./BookCard";

export default function ResultsGrid({ books }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookCard key={`${book.key}-${book.cover_i}`} book={book} />
      ))}
    </div>
  );
}
