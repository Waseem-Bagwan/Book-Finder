import React, { createContext, useState, useEffect, useContext } from "react";

// Create the context
const BookContext = createContext();

// Custom hook for easy access
export function useBookContext() {
  return useContext(BookContext);
}

export function BookProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add or remove favorite
  const addFavorite = (book) => {
    if (!favorites.some((b) => b.key === book.key)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFavorite = (key) => {
    setFavorites(favorites.filter((b) => b.key !== key));
  };

  const isFavorite = (key) => favorites.some((b) => b.key === key);

  return (
    <BookContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </BookContext.Provider>
  );
}
