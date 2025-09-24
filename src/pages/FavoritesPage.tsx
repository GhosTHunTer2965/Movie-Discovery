import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Star, Trash2 } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { apiService } from '../utils/api';

export function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    document.title = `My Favorites (${favorites.length}) - MovieDiscover`;
  }, [favorites.length]);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">No Favorites Yet</h1>
        <p className="text-gray-400 mb-6">
          Start exploring movies and add them to your favorites to see them here.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Discover Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">My Favorites</h1>
        <p className="text-gray-400">
          {favorites.length} movie{favorites.length !== 1 ? 's' : ''} in your collection
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((movie) => {
          const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA';
          const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

          return (
            <article
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex">
                <div className="flex-shrink-0 w-32">
                  <Link to={`/movie/${movie.id}`} aria-label={`View details for ${movie.title}`}>
                    <img
                      src={apiService.getImageUrl(movie.poster_path, 'w300')}
                      alt={`${movie.title} poster`}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                  </Link>
                </div>

                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/movie/${movie.id}`}
                      className="block group"
                      aria-label={`View details for ${movie.title}`}
                    >
                      <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {movie.title}
                      </h3>
                    </Link>

                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        <span>{releaseYear}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" aria-hidden="true" />
                        <span>{rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-500">
                      Added {new Date(movie.addedAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={() => removeFromFavorites(movie.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      aria-label={`Remove ${movie.title} from favorites`}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
