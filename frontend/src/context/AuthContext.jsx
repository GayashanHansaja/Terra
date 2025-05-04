import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Check if user is logged in on page load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/me', {
          withCredentials: true
        });
        
        if (res.data.success) {
          setCurrentUser(res.data.user);
          // Fetch favorites if user is logged in
          fetchFavorites();
        }
      } catch (err) {
        console.log('Not logged in');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Fetch user favorites
  const fetchFavorites = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/favorites', {
        withCredentials: true
      });
      
      if (res.data.success) {
        setFavorites(res.data.favorites);
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
    }
  };

  // Login function
  const login = async (username, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password
      }, { withCredentials: true });

      if (res.data.success) {
        setCurrentUser(res.data.user);
        fetchFavorites(); // Get favorites after login
        return { success: true };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password
      }, { withCredentials: true });

      if (res.data.success) {
        setCurrentUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Registration failed' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/logout', {}, {
        withCredentials: true
      });
      setCurrentUser(null);
      setFavorites([]);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Add to favorites
  const addToFavorites = async (country) => {
    if (!currentUser) return { success: false, message: 'Please login to add favorites' };

    try {
      const res = await axios.post('http://localhost:5000/api/users/favorites', {
        countryCode: country.cca3,
        countryName: country.name.common,
        flagUrl: country.flags.svg
      }, { withCredentials: true });

      if (res.data.success) {
        // Add to local state to avoid refetching
        setFavorites([...favorites, res.data.favorite]);
        return { success: true };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to add favorite' 
      };
    }
  };

  // Remove from favorites
const removeFromFavorites = async (id) => {
  try {
    // Find the favorite item by ID to get the country code
    const favorite = favorites.find(fav => fav._id === id);
    if (!favorite) return { success: false, message: 'Favorite not found' };
    
    const res = await axios.delete(`http://localhost:5000/api/users/favorites/${id}/${favorite.countryCode}`, {
      withCredentials: true
    });

    if (res.data.success) {
      // Update local state
      setFavorites(favorites.filter(fav => fav._id !== id));
      return { success: true };
    }
  } catch (err) {
    return { 
      success: false, 
      message: err.response?.data?.message || 'Failed to remove favorite' 
    };
  }
};
  // Check if a country is in favorites
  const isCountryFavorite = (countryCode) => {
    return favorites.some(fav => fav.countryCode === countryCode);
  };

  // Context value
  const value = {
    currentUser,
    loading,
    favorites,
    login,
    register,
    logout,
    addToFavorites,
    removeFromFavorites,
    isCountryFavorite,
    fetchFavorites
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};