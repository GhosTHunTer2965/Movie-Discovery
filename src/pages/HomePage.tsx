import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterSort } from '../components/FilterSort';
import { MovieGrid } from '../components/MovieGrid';
import { useMovieAPI, useGenres } from '../hooks/useMovieAPI';
import { useDebounce } from '../hooks/useDebounce';
import { FilterOptions } from '../types/movie';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    genre: '',
    year: '',
    sortBy: 'popularity.desc',
    sortOrder: 'desc',
  });
  const [resetTrigger, setResetTrigger] = useState(0);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { genres, loading: genresLoading } = useGenres();
  const { movies, loading, error, hasMore, loadMore, totalResults } = useMovieAPI(
    debouncedSearchQuery,
    filters,
    resetTrigger
  );

  useEffect(() => {
    document.title = searchQuery 
      ? `Search: ${searchQuery} - MovieDiscover`
      : 'Trending Movies - MovieDiscover';
  }, [searchQuery]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setResetTrigger(prev => prev + 1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Reset to default sorting when searching
    if (query.trim() && filters.sortBy !== 'popularity.desc') {
      setFilters(prev => ({ ...prev, sortBy: 'popularity.desc' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          {searchQuery ? 'Search Results' : 'Trending Movies'}
        </h1>
        {searchQuery && (
          <p className="text-gray-400">
            {totalResults > 0 ? `Found ${totalResults.toLocaleString()} results for "${searchQuery}"` : 'No results found'}
          </p>
        )}
      </div>

      <SearchBar
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for movies..."
        aria-label="Search for movies"
      />

      {!genresLoading && (
        <FilterSort
          filters={filters}
          onFiltersChange={handleFiltersChange}
          genres={genres}
        />
      )}

      <MovieGrid
        movies={movies}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        error={error}
      />
    </div>
  );
}