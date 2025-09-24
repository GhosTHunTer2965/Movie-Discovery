import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { Genre, FilterOptions } from '../types/movie';

interface FilterSortProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  genres: Genre[];
  className?: string;
}

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularity (High to Low)' },
  { value: 'popularity.asc', label: 'Popularity (Low to High)' },
  { value: 'vote_average.desc', label: 'Rating (High to Low)' },
  { value: 'vote_average.asc', label: 'Rating (Low to High)' },
  { value: 'release_date.desc', label: 'Release Date (Newest)' },
  { value: 'release_date.asc', label: 'Release Date (Oldest)' },
];

const YEAR_OPTIONS = Array.from({ length: 30 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

export function FilterSort({ filters, onFiltersChange, genres, className = '' }: FilterSortProps) {
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      genre: '',
      year: '',
      sortBy: 'popularity.desc',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters = filters.genre || filters.year || filters.sortBy !== 'popularity.desc';

  return (
    <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" aria-hidden="true" />
          <h3 className="text-lg font-medium">Filters & Sort</h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            aria-label="Reset all filters"
          >
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-300 mb-2">
            Genre
          </label>
          <select
            id="genre-filter"
            value={filters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="year-filter" className="block text-sm font-medium text-gray-300 mb-2">
            Release Year
          </label>
          <select
            id="year-filter"
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All Years</option>
            {YEAR_OPTIONS.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort-filter" className="block text-sm font-medium text-gray-300 mb-2">
            <ArrowUpDown className="w-4 h-4 inline mr-1" aria-hidden="true" />
            Sort By
          </label>
          <select
            id="sort-filter"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}