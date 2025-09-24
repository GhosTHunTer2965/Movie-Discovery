import React, { useEffect, useRef, useCallback } from 'react';
import { MovieCard, MovieCardSkeleton } from './MovieCard';
import { Movie } from '../types/movie';
import { Loader2 } from 'lucide-react';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  error?: string | null;
}

export function MovieGrid({ movies, loading, hasMore, onLoadMore, error }: MovieGridProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [hasMore, loading, onLoadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: '100px',
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!loading && movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No movies found</div>
        <div className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</div>
      </div>
    );
  }

  return (
    <div>
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8"
        role="grid"
        aria-label="Movies grid"
      >
        {movies.map((movie) => (
          <div key={movie.id} role="gridcell">
            <MovieCard movie={movie} />
          </div>
        ))}
        
        {loading && (
          <>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={`skeleton-${index}`} role="gridcell">
                <MovieCardSkeleton />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={observerTarget} className="h-10 flex items-center justify-center">
        {loading && hasMore && (
          <div className="flex items-center space-x-2 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            <span>Loading more movies...</span>
          </div>
        )}
        
        {!hasMore && movies.length > 0 && (
          <div className="text-gray-500 text-sm">
            That's all the movies we could find!
          </div>
        )}
      </div>
    </div>
  );
}