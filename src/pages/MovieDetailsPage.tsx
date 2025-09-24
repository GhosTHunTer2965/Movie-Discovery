import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Star, 
  Heart, 
  ArrowLeft, 
  Play,
  Loader2 
} from 'lucide-react';
import { MovieDetails, Movie } from '../types/movie';
import { apiService, APIError } from '../utils/api';
import { useFavorites } from '../hooks/useFavorites';
import { useWatchProviders } from '../hooks/useWatchProviders';
import { MovieCard } from '../components/MovieCard';
import { WatchProviders } from '../components/WatchProviders';

export function MovieDetailsPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { isFavorite, toggleFavorite } = useFavorites();
  const { providers } = useWatchProviders(movie?.id || null);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!movieId) return;

      setLoading(true);
      setError(null);

      try {
        const [movieResponse, similarResponse] = await Promise.all([
          apiService.getMovieDetails(parseInt(movieId)),
          apiService.getSimilarMovies(parseInt(movieId)),
        ]);

        setMovie(movieResponse);
        setSimilarMovies(similarResponse.results.slice(0, 12));
        document.title = `${movieResponse.title} - MovieDiscover`;
      } catch (err) {
        if (err instanceof APIError) {
          setError(err.message);
        } else {
          setError('Failed to load movie details');
        }
        document.title = 'Movie Not Found - MovieDiscover';
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        <span className="ml-2 text-gray-400">Loading movie details...</span>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg mb-4">{error || 'Movie not found'}</div>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';
  const isMovieFavorite = isFavorite(movie.id);

  return (
    <div className="space-y-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4"
        aria-label="Go back to home page"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Movies
      </Link>

      <div className="relative">
        {movie.backdrop_path && (
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <img
              src={apiService.getImageUrl(movie.backdrop_path, 'w1280')}
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
          </div>
        )}

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-gray-800/50 rounded-lg">
          <div className="md:col-span-1">
            <img
              src={apiService.getImageUrl(movie.poster_path, 'w500')}
              alt={`${movie.title} poster`}
              className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-gray-300 italic">{movie.tagline}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-gray-400" aria-hidden="true" />
                <span className="text-gray-300">{releaseYear}</span>
              </div>

              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-400" aria-hidden="true" />
                <span className="text-gray-300">{runtime}</span>
              </div>

              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" aria-hidden="true" />
                <span className="text-gray-300">{rating}</span>
                <span className="text-gray-500">({movie.vote_count.toLocaleString()} votes)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleFavorite(movie)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all ${
                  isMovieFavorite
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-700 text-white hover:bg-red-600'
                } focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
                aria-label={isMovieFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
              >
                <Heart className={`w-5 h-5 ${isMovieFavorite ? 'fill-current' : ''}`} aria-hidden="true" />
                <span>{isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <WatchProviders 
                providers={providers} 
                movieTitle={movie.title} 
              />
            </div>
          </div>
        </div>
      </div>

      {similarMovies.length > 0 && (
        <section aria-labelledby="similar-movies-title">
          <h2 id="similar-movies-title" className="text-2xl font-bold text-white mb-6">
            Similar Movies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similarMovies.map((similarMovie) => (
              <MovieCard key={similarMovie.id} movie={similarMovie} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}