# Movie Discovery Application

A modern, responsive React single-page application for discovering movies, built with React 18+ and TypeScript. Features trending movies, advanced search and filtering, detailed movie information, and personal favorites management.

## 🚀 Features

### Core Functionality
- **Trending Movies**: Browse the latest trending movies with an infinite scroll grid
- **Advanced Search**: Debounced search functionality (500ms delay) to minimize API calls
- **Smart Filtering**: Filter by genre and release year, combinable with search
- **Flexible Sorting**: Sort by popularity, rating, or release date (ascending/descending)
- **Infinite Scroll**: Seamless pagination with loading indicators
- **Movie Details**: Comprehensive movie information including runtime, genres, ratings, and overview
- **Similar Movies**: Discover related movies on detail pages
- **Favorites Management**: Add/remove movies to personal favorites with localStorage persistence

### Streaming Platform Integration
- **OTT Platform Availability**: Shows where movies are available to stream, rent, or buy
- **Platform Logos**: Visual indicators for Netflix, Amazon Prime, Disney+, Hulu, and more
- **Regional Support**: Displays availability for your region (defaults to US)
- **External Links**: Direct links to JustWatch for additional viewing options

### User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- **Accessibility**: WCAG compliant with proper ARIA labels, keyboard navigation, and screen reader support
- **Loading States**: Skeleton loaders and smooth transitions
- **Error Handling**: Comprehensive error states with retry options
- **Performance**: Optimized with request cancellation, memoization, and efficient re-renders

## 🛠️ Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: The Movie Database (TMDb)
- **Build Tool**: Vite
- **State Management**: React Hooks with custom hooks
- **Storage**: localStorage for favorites persistence

## 📋 Prerequisites

- Node.js 16+ and npm
- TMDb API key (free registration required)

## ⚙️ Setup Instructions

### 1. Clone and Install
```bash
git clone <repository-url>
cd movie-discovery-app
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/w500
```

### 3. Get TMDb API Key
1. Visit [The Movie Database (TMDb)](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Request an API key (choose "Developer" option)
5. Copy your API key to the `.env` file

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
npm run preview
```

## 🎯 Usage

### Navigation
- **Home**: Browse trending movies and use search/filters
- **Movie Details**: Click any movie poster to view detailed information
- **Favorites**: Access your saved movies from the navigation menu

### Search and Filtering
- Use the search bar to find specific movies
- Apply genre and year filters independently or combined with search
- Sort results by popularity, rating, or release date
- Scroll down to load more results automatically

### Favorites Management
- Click the heart icon on any movie card to add/remove from favorites
- Favorites are saved locally and persist between sessions
- View all favorites on the dedicated Favorites page

### Streaming Information
- View streaming platform availability on movie cards (compact view)
- See detailed "Where to Watch" information on movie detail pages
- Click "More options" to view additional platforms on JustWatch

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── FilterSort.tsx
│   ├── Layout.tsx
│   ├── MovieCard.tsx
│   ├── MovieGrid.tsx
│   ├── SearchBar.tsx
│   └── WatchProviders.tsx
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts
│   ├── useFavorites.ts
│   ├── useMovieAPI.ts
│   └── useWatchProviders.ts
├── pages/              # Page components
│   ├── FavoritesPage.tsx
│   ├── HomePage.tsx
│   ├── MovieDetailsPage.tsx
│   └── NotFoundPage.tsx
├── types/              # TypeScript type definitions
│   └── movie.ts
├── utils/              # Utility functions
│   ├── api.ts
│   └── storage.ts
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Explained

### Debounced Search
Search requests are delayed by 500ms to prevent excessive API calls while typing, improving performance and user experience.

### Infinite Scroll
Movies load automatically as you scroll, with visual loading indicators and proper end-of-list handling.

### Request Cancellation
Previous API requests are cancelled when new ones are made, preventing race conditions and outdated results.

### Accessibility
- Semantic HTML structure with proper landmarks
- ARIA labels and roles for screen readers
- Keyboard navigation support
- Focus management and visible focus indicators
- Alt text for all images

### Error Handling
- Network error recovery with retry options
- API quota limit notifications
- Invalid route handling (404 page)
- Graceful fallbacks for missing data

## 🚫 Limitations

### API Limitations
- **Rate Limiting**: TMDb has request limits (40 requests per 10 seconds for free accounts)
- **Regional Availability**: Streaming platform data may vary by region
- **Data Freshness**: Movie information depends on TMDb's update frequency

### Technical Limitations
- **Client-Side Storage**: Favorites are stored locally and won't sync across devices
- **Search Scope**: Search is limited to movie titles (no cast/crew search)
- **Offline Support**: Requires internet connection for all functionality
- **Browser Support**: Modern browsers only (ES2020+ features)

### Feature Limitations
- **No User Accounts**: No cloud sync or user profiles
- **Limited Metadata**: Some movies may have incomplete information
- **Single Region**: Streaming availability shown for one region at a time
- **No Watchlist**: Only favorites functionality (no separate watchlist)

## 🔒 Security Considerations

- API keys are stored in environment variables
- No sensitive data is stored in localStorage
- All external links open in new tabs with security attributes
- Input sanitization for search queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the movie data API
- [JustWatch](https://www.justwatch.com/) for streaming platform information
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

If you encounter any issues:
1. Check that your TMDb API key is correctly configured
2. Verify your internet connection
3. Check the browser console for error messages
4. Ensure you're using a modern browser with JavaScript enabled

For additional help, please refer to the [TMDb API documentation](https://developers.themoviedb.org/3).