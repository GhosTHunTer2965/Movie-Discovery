import { useState, useEffect, useCallback, useRef } from 'react';
import { Movie, APIResponse, FilterOptions, Genre } from '../types/movie';
import { apiService } from '../utils/api';
import { APIError } from '../utils/api';

interface UseMovieAPIResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  totalResults: number;
}

export function useMovieAPI(
  searchQuery: string,
  filters: FilterOptions,
  resetTrigger?: number
): UseMovieAPIResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastRequestRef = useRef<string>('');

  const fetchMovies = useCallback(async (pageNum: number, reset: boolean = false) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const requestKey = `${searchQuery}-${JSON.stringify(filters)}-${pageNum}`;
    lastRequestRef.current = requestKey;

    setLoading(true);
    setError(null);

    try {
      let response: APIResponse<Movie>;

      if (searchQuery.trim()) {
        response = await apiService.searchMovies(searchQuery, pageNum);
      } else {
        // Use discover endpoint for filtering and trending for default
        if (filters.genre || filters.year || filters.sortBy !== 'popularity.desc') {
          const sortBy = filters.sortOrder === 'asc' 
            ? filters.sortBy.replace('.desc', '.asc')
            : filters.sortBy.includes('.asc') 
              ? filters.sortBy.replace('.asc', '.desc')
              : filters.sortBy;

          response = await apiService.discoverMovies({
            page: pageNum,
            with_genres: filters.genre || undefined,
            primary_release_year: filters.year || undefined,
            sort_by: sortBy,
          });
        } else {
          response = await apiService.getTrendingMovies(pageNum);
        }
      }

      // Check if this is still the latest request
      if (lastRequestRef.current === requestKey && !controller.signal.aborted) {
        if (reset) {
          setMovies(response.results);
        } else {
          setMovies(prev => [...prev, ...response.results]);
        }
        
        setHasMore(pageNum < response.total_pages);
        setTotalResults(response.total_results);
      }
    } catch (err) {
      if (!controller.signal.aborted && lastRequestRef.current === requestKey) {
        if (err instanceof APIError) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    } finally {
      if (!controller.signal.aborted && lastRequestRef.current === requestKey) {
        setLoading(false);
      }
    }
  }, [searchQuery, filters]);

  // Reset and fetch on search/filter change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(1, true);
  }, [searchQuery, filters, resetTrigger]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage, false);
    }
  }, [loading, hasMore, page, fetchMovies]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    movies,
    loading,
    error,
    hasMore,
    loadMore,
    totalResults,
  };
}

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await apiService.getGenres();
        setGenres(response.genres);
      } catch (err) {
        if (err instanceof APIError) {
          setError(err.message);
        } else {
          setError('Failed to load genres');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
}