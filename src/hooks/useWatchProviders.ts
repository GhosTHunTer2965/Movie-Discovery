import { useState, useEffect } from 'react';
import { WatchProviders } from '../types/movie';
import { apiService, APIError } from '../utils/api';

export function useWatchProviders(movieId: number | null, region: string = 'US') {
  const [providers, setProviders] = useState<WatchProviders | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setProviders(null);
      return;
    }

    const fetchProviders = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiService.getWatchProviders(movieId, region);
        setProviders(response.results[region] || null);
      } catch (err) {
        if (err instanceof APIError) {
          setError(err.message);
        } else {
          setError('Failed to load watch providers');
        }
        setProviders(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [movieId, region]);

  return { providers, loading, error };
}