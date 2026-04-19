import { useEffect, useState } from "react";

const STORAGE_KEY = "favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const save = (data) => {
    setFavorites(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const toggleFavorite = (item) => {
    const exists = favorites.find((f) => f.id === item.id);

    if (exists) {
      save(favorites.filter((f) => f.id !== item.id));
    } else {
      save([...favorites, item]);
    }
  };

  const isFavorite = (id) => {
    return favorites.some((f) => f.id === id);
  };

  const removeFavorite = (id) => {
    save(favorites.filter((f) => f.id !== id));
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    removeFavorite,
  };
}
