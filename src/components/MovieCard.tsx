import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';
import { apiService } from '../utils/api';
import { useFavorites } from '../hooks/useFavorites';
import { useWatchProviders } from '../hooks/useWatchProviders';
import { WatchProviders } from './WatchProviders';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { providers } = useWatchProviders(movie.id);
  const isMovieFavorite = isFavorite(movie.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <article className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <Link to={`/movie/${movie.id}`} className="block" aria-label={`View details for ${movie.title}`}>
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={apiService.getImageUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-movie.jpg';
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isMovieFavorite
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-black/50 text-white hover:bg-red-500'
            } focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
            aria-label={isMovieFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
          >
            <Heart 
              className={`w-5 h-5 ${isMovieFavorite ? 'fill-current' : ''}`} 
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>{releaseYear}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" aria-hidden="true" />
              <span>{rating}</span>
            </div>
          </div>

          <div className="mt-2">
            <WatchProviders 
              providers={providers} 
              movieTitle={movie.title} 
              compact={true} 
            />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="aspect-[2/3] bg-gray-700" />
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded mb-2" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-700 rounded w-16" />
          <div className="h-4 bg-gray-700 rounded w-12" />
        </div>
      </div>
    </div>
  );
}