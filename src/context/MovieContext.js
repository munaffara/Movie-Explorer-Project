import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (err) {
        console.error('Failed to parse favorites', err);
        localStorage.removeItem('favorites');
      }
    }

    // Fetch trending movies on initial load
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    setLoading(true);
    try {
      const response = await api.get('/trending/movie/week');
      setTrendingMovies(response.data.results);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.status_message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query, pageNum = 1) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get('/search/movie', {
        params: {
          query,
          page: pageNum
        }
      });

      if (pageNum === 1) {
        setSearchResults(response.data.results);
      } else {
        setSearchResults(prev => [...prev, ...response.data.results]);
      }
      setPage(response.data.page);
      setTotalPages(response.data.total_pages);
      setError(null);
      
      // Save last search query
      localStorage.setItem('lastSearch', query);
    } catch (err) {
      setError(err.response?.data?.status_message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch && page < totalPages) {
      searchMovies(lastSearch, page + 1);
    }
  };

  const addToFavorites = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (movieId) => {
    const newFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        searchResults,
        loading,
        error,
        searchMovies,
        loadMore,
        page,
        totalPages,
        favorites,
        addToFavorites,
        removeFromFavorites,
        fetchTrendingMovies // Added for refresh capability
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};