import { Movie, MovieDetails, APIResponse, Genre, WatchProvidersResponse } from '../types/movie';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error('TMDB API key is required. Please add VITE_TMDB_API_KEY to your environment variables.');
}

class APIService {
  private async request<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.set('api_key', API_KEY);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });

    try {
      const response = await fetch(url.toString(), {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new APIError(
          errorData.status_message || `HTTP ${response.status}: ${response.statusText}`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Network error occurred. Please check your connection.');
    }
  }

  async getTrendingMovies(page: number = 1): Promise<APIResponse<Movie>> {
    return this.request<APIResponse<Movie>>('/trending/movie/week', { page });
  }

  async searchMovies(query: string, page: number = 1): Promise<APIResponse<Movie>> {
    return this.request<APIResponse<Movie>>('/search/movie', { query, page });
  }

  async discoverMovies(params: {
    page?: number;
    with_genres?: string;
    primary_release_year?: string;
    sort_by?: string;
  }): Promise<APIResponse<Movie>> {
    return this.request<APIResponse<Movie>>('/discover/movie', params);
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.request<MovieDetails>(`/movie/${movieId}`);
  }

  async getSimilarMovies(movieId: number): Promise<APIResponse<Movie>> {
    return this.request<APIResponse<Movie>>(`/movie/${movieId}/similar`);
  }

  async getGenres(): Promise<{ genres: Genre[] }> {
    return this.request<{ genres: Genre[] }>('/genre/movie/list');
  }

  async getWatchProviders(movieId: number, region: string = 'US'): Promise<WatchProvidersResponse> {
    return this.request<WatchProvidersResponse>(`/movie/${movieId}/watch/providers`);
  }

  getImageUrl(path: string | null, size: string = 'w500'): string {
    if (!path) return '/placeholder-movie.jpg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}

export const apiService = new APIService();

export class APIError extends Error {
  constructor(message: string, public status_code?: number) {
    super(message);
    this.name = 'APIError';
  }
}
