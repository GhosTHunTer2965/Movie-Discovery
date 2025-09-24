import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Heart, Home, Search } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
              aria-label="Movie Discovery - Home"
            >
              <Film className="w-8 h-8" aria-hidden="true" />
              <span>MovieDiscover</span>
            </Link>

            <nav role="navigation" aria-label="Main navigation">
              <ul className="flex items-center space-x-8">
                <li>
                  <Link
                    to="/"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/') 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                    aria-current={isActive('/') ? 'page' : undefined}
                  >
                    <Home className="w-4 h-4" aria-hidden="true" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/favorites') 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                    aria-current={isActive('/favorites') ? 'page' : undefined}
                  >
                    <Heart className="w-4 h-4" aria-hidden="true" />
                    <span>Favorites</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main role="main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 mt-auto" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-400 text-sm">
            Powered by The Movie Database (TMDb) API
          </p>
        </div>
      </footer>
    </div>
  );
}