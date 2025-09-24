import { useState, useEffect, useCallback } from 'react';
import { storage, FavoriteMovie } from '../utils/storage';
import { Movie } from '../types/movie';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  useEffect(() => {
    setFavorites(storage.getFavorites());
  }, []);

  const addToFavorites = useCallback((movie: Movie) => {
    const favoriteMovie: FavoriteMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      addedAt: new Date().toISOString(),
    };

    storage.addToFavorites(favoriteMovie);
    setFavorites(storage.getFavorites());
  }, []);

  const removeFromFavorites = useCallback((movieId: number) => {
    storage.removeFromFavorites(movieId);
    setFavorites(storage.getFavorites());
  }, []);

  const isFavorite = useCallback((movieId: number) => {
    return storage.isFavorite(movieId);
  }, []);

  const toggleFavorite = useCallback((movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }, [isFavorite, addToFavorites, removeFromFavorites]);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };
}