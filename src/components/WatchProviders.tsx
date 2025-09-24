import React from 'react';
import { ExternalLink, Tv } from 'lucide-react';
import { WatchProviders as WatchProvidersType } from '../types/movie';
import { apiService } from '../utils/api';

interface WatchProvidersProps {
  providers: WatchProvidersType | null;
  movieTitle: string;
  compact?: boolean;
}

export function WatchProviders({ providers, movieTitle, compact = false }: WatchProvidersProps) {
  if (!providers) {
    return null;
  }

  const { flatrate, rent, buy, link } = providers;
  const hasProviders = flatrate?.length || rent?.length || buy?.length;

  if (!hasProviders) {
    return compact ? null : (
      <div className="text-gray-400 text-sm">
        <Tv className="w-4 h-4 inline mr-1" aria-hidden="true" />
        Not available on streaming platforms
      </div>
    );
  }

  if (compact) {
    // Show only streaming platforms in compact mode
    if (!flatrate?.length) return null;
    
    return (
      <div className="flex items-center space-x-1">
        <Tv className="w-3 h-3 text-gray-400" aria-hidden="true" />
        <div className="flex space-x-1">
          {flatrate.slice(0, 3).map((provider) => (
            <img
              key={provider.provider_id}
              src={apiService.getImageUrl(provider.logo_path, 'w45')}
              alt={provider.provider_name}
              className="w-4 h-4 rounded"
              title={provider.provider_name}
            />
          ))}
          {flatrate.length > 3 && (
            <span className="text-xs text-gray-400">+{flatrate.length - 3}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Tv className="w-5 h-5 mr-2" aria-hidden="true" />
          Where to Watch
        </h3>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
            aria-label={`View more watch options for ${movieTitle} on JustWatch`}
          >
            <ExternalLink className="w-4 h-4 mr-1" aria-hidden="true" />
            More options
          </a>
        )}
      </div>

      <div className="space-y-3">
        {flatrate && flatrate.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Stream</h4>
            <div className="flex flex-wrap gap-2">
              {flatrate.map((provider) => (
                <div
                  key={provider.provider_id}
                  className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-2"
                >
                  <img
                    src={apiService.getImageUrl(provider.logo_path, 'w92')}
                    alt={provider.provider_name}
                    className="w-6 h-6 rounded"
                  />
                  <span className="text-sm text-white">{provider.provider_name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {rent && rent.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Rent</h4>
            <div className="flex flex-wrap gap-2">
              {rent.map((provider) => (
                <div
                  key={provider.provider_id}
                  className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-2"
                >
                  <img
                    src={apiService.getImageUrl(provider.logo_path, 'w92')}
                    alt={provider.provider_name}
                    className="w-6 h-6 rounded"
                  />
                  <span className="text-sm text-white">{provider.provider_name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {buy && buy.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Buy</h4>
            <div className="flex flex-wrap gap-2">
              {buy.map((provider) => (
                <div
                  key={provider.provider_id}
                  className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-2"
                >
                  <img
                    src={apiService.getImageUrl(provider.logo_path, 'w92')}
                    alt={provider.provider_name}
                    className="w-6 h-6 rounded"
                  />
                  <span className="text-sm text-white">{provider.provider_name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}