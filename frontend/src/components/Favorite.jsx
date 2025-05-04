import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaTrashAlt, 
  FaGlobeAmericas, 
  FaSignInAlt, 
  FaTimes,
  FaChevronRight
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Favorite = () => {
  const { currentUser, loading, favorites, removeFromFavorites } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  // Handle removing a favorite
  const handleRemoveFavorite = async (id) => {
    try {
      const result = await removeFromFavorites(id);
      if (!result.success) {
        console.error('Error removing favorite:', result.message);
        alert('Failed to remove from favorites');
      }
    } catch (err) {
      console.error('Error removing favorite:', err);
      alert('Failed to remove from favorites');
    }
  };
  

  return (
    <div className="relative">
      {/* Favorites button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-12 w-12 items-center justify-center rounded-full 
          ${isOpen 
            ? 'bg-purple-700 text-white shadow-lg shadow-purple-500/30' 
            : 'bg-gray-900/80 text-purple-400 hover:bg-gray-800/90 hover:text-purple-300'} 
          border border-purple-500/30 transition-all duration-300 backdrop-blur-md`}
        aria-label="Toggle favorites"
      >
        {isOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <div className="relative">
            <FaHeart className="text-xl" />
            {currentUser && favorites.length > 0 && (
              <div className="absolute -top-1 -right-1 flex h-3 w-4 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                {favorites.length}
              </div>
            )}
          </div>
        )}
      </button>

      {/* Favorites panel - shown when isOpen is true */}
      {isOpen && (
        <div className="absolute right-0 top-16 z-50 w-72 animate-fadeIn rounded-lg border border-purple-500/20 bg-gray-900/95 p-4 shadow-lg backdrop-blur-md md:w-80">
          {/* Panel header */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="bg-gradient-to-r from-purple-400 via-blue-300 to-purple-500 bg-clip-text text-lg font-semibold text-transparent drop-shadow-sm">
              <FaHeart className="mr-2 inline-block text-purple-400" />
              Your Favorites
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-gray-400 hover:text-white"
              aria-label="Close favorites"
            >
              <FaTimes />
            </button>
          </div>

          {/* Panel content */}
          {!currentUser ? (
            // Not authenticated state
            <div className="space-y-3 rounded-md border border-purple-600/20 bg-gray-800/60 p-4 text-center">
              <p className="text-gray-300">
                Sign in to view your favorites
              </p>
              <button 
                className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-purple-700 to-blue-600 py-2 text-white transition hover:from-purple-600 hover:to-blue-500"
              >
                <FaSignInAlt />
                Sign In
              </button>
            </div>
          ) : loading ? (
            // Loading state
            <div className="flex justify-center py-6">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-purple-500"></div>
            </div>
          ) : favorites.length === 0 ? (
            // Empty state
            <div className="space-y-3 rounded-md border border-purple-600/20 bg-gray-800/60 p-4 text-center">
              <FaGlobeAmericas className="mx-auto text-3xl text-gray-500" />
              <p className="text-gray-300">No favorites yet</p>
              <Link 
                to="/countries" 
                className="inline-block rounded-md bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 text-white transition hover:from-purple-500 hover:to-blue-400"
                onClick={() => setIsOpen(false)}
              >
                Explore Countries
              </Link>
            </div>
          ) : (
            // Favorites list
            <div className="max-h-64 space-y-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800">
              {favorites.map(favorite => (
                <div 
                  key={favorite._id}
                  className="flex items-center justify-between rounded-md border border-purple-500/20 bg-gray-800/60 p-2 transition group hover:border-purple-500/40"
                >
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <img 
                      src={favorite.flagUrl} 
                      alt={`${favorite.countryName} flag`} 
                      className="h-6 w-8 rounded object-cover shadow-md"
                    />
                    <Link 
                      to={`/country/${favorite.countryCode}`}
                      className="truncate text-white transition hover:text-purple-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {favorite.countryName}
                    </Link>
                  </div>
                  <button
                    onClick={() => handleRemoveFavorite(favorite._id)}
                    className="ml-2 text-gray-400 transition hover:text-red-400"
                    aria-label={`Remove ${favorite.countryName} from favorites`}
                  >
                    <FaTrashAlt className="text-sm" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* View all link (only shown when there are favorites) */}
          {currentUser && favorites.length > 0 && (
            <div className="mt-3 border-t border-purple-500/20 pt-3">
              <Link
                to="/favorites"
                className="flex w-full items-center justify-center gap-1 py-2 text-center text-sm text-purple-400 transition hover:text-purple-300"
                onClick={() => setIsOpen(false)}
              >
                View All Favorites
                <FaChevronRight className="text-xs" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorite;