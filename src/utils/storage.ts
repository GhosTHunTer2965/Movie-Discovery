export const FAVORITES_KEY = 'movie-discovery-favorites';

export interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  addedAt: string;
}

export const storage = {
  getFavorites(): FavoriteMovie[] {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  },

  addToFavorites(movie: FavoriteMovie): void {
    try {
      const favorites = this.getFavorites();
      const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
      
      if (!isAlreadyFavorite) {
        const updatedFavorites = [...favorites, { ...movie, addedAt: new Date().toISOString() }];
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  },

  removeFromFavorites(movieId: number): void {
    try {
      const favorites = this.getFavorites();
      const updatedFavorites = favorites.filter(fav => fav.id !== movieId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  },

  isFavorite(movieId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.id === movieId);
  }
};