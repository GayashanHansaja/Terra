import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function CountryCard({ country }) {
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser, addToFavorites, removeFromFavorites, isCountryFavorite, favorites } = useAuth();
    
    // Check if this country is in favorites
    const favorite = favorites.find(f => f.countryCode === country.cca3);
    const isFavorite = Boolean(favorite);
    
    const toggleFavorite = async (e) => {
        e.preventDefault(); // Stop link navigation
        e.stopPropagation(); // Prevent event bubbling
        
        if (!currentUser) {
            alert('Please sign in to save favorites');
            return;
        }
        
        try {
            setIsLoading(true);
            
            if (!isFavorite) {
                // Add to favorites
                await addToFavorites(country);
            } else if (favorite) {
                // Remove from favorites - pass the favorite ID
                await removeFromFavorites(favorite._id);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Link
            to={`/country/${country.cca3}`}
            className="group relative block overflow-hidden rounded-xl border border-purple-500/20 bg-gray-900/60 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-purple-500/20"
            data-testid="country-card"
        >
            {/* Favorite Button */}
            <button
                className="absolute top-3 right-3 z-10 rounded-full bg-black/50 p-2 backdrop-blur-sm transition-all hover:bg-black/70"
                onClick={toggleFavorite}
                disabled={isLoading}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-purple-500"></div>
                ) : isFavorite ? (
                    <FaHeart className="h-5 w-5 text-purple-500" />
                ) : (
                    <FaRegHeart className="h-5 w-5 text-white hover:text-purple-300" />
                )}
            </button>
            
            <div className="relative">
                <img
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                    <h2
                        data-testid="country-name"
                        className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-xl font-bold tracking-tight text-transparent"
                    >
                        {country.name.common}
                    </h2>
                    {country.region && (
                        <p className="mt-1 text-sm text-purple-200">
                            {country.region}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}
