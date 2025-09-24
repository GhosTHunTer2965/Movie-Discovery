import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found - MovieDiscover';
  }, []);

  return (
    <div className="text-center py-16">
      <div className="text-9xl font-bold text-gray-600 mb-4">404</div>
      
      <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
      
      <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <Home className="w-5 h-5 mr-2" aria-hidden="true" />
          Go Home
        </Link>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <Search className="w-5 h-5 mr-2" aria-hidden="true" />
          Search Movies
        </Link>
      </div>
    </div>
  );
}