// src/components/MovieFilters.js
import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  useTheme
} from '@mui/material';
import { MovieContext } from '../context/MovieContext';

const MovieFilters = () => {
  const { searchResults, trendingMovies, searchMovies } = useContext(MovieContext);
  const theme = useTheme();
  const [filters, setFilters] = useState({
    genre: '',
    year: [1990, new Date().getFullYear()],
    rating: [0, 10]
  });

  // Get unique genres from movies
  const allGenres = [
    ...new Set(
      [...trendingMovies, ...searchResults]
        .flatMap(movie => movie.genre_ids || [])
    )
  ];

  // Year range for slider
  const currentYear = new Date().getFullYear();
  const yearRange = [1980, currentYear];

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    const moviesToFilter = searchResults.length > 0 ? searchResults : trendingMovies;
    
    return moviesToFilter.filter(movie => {
      // Genre filter
      if (filters.genre && !movie.genre_ids?.includes(Number(filters.genre))) {
        return false;
      }
      
      // Year filter
      const movieYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 0;
      if (movieYear < filters.year[0] || movieYear > filters.year[1]) {
        return false;
      }
      
      // Rating filter
      if (movie.vote_average < filters.rating[0] || movie.vote_average > filters.rating[1]) {
        return false;
      }
      
      return true;
    });
  };

  const clearFilters = () => {
    setFilters({
      genre: '',
      year: [1990, currentYear],
      rating: [0, 10]
    });
  };

  const filteredMovies = applyFilters();

  return (
    <Box
      sx={{
        p: 3,
        mb: 4,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: theme.shadows[2]
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Filter Movies
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={filters.genre}
          onChange={(e) => handleFilterChange('genre', e.target.value)}
          label="Genre"
        >
          <MenuItem value="">All Genres</MenuItem>
          {allGenres.map(genreId => (
            <MenuItem key={genreId} value={genreId}>
              {getGenreName(genreId)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography gutterBottom sx={{ mt: 2 }}>
        Release Year: {filters.year[0]} - {filters.year[1]}
      </Typography>
      <Slider
        value={filters.year}
        onChange={(e, newValue) => handleFilterChange('year', newValue)}
        valueLabelDisplay="auto"
        min={yearRange[0]}
        max={yearRange[1]}
        sx={{ mb: 3 }}
      />

      <Typography gutterBottom>
        Rating: {filters.rating[0]} - {filters.rating[1]}
      </Typography>
      <Slider
        value={filters.rating}
        onChange={(e, newValue) => handleFilterChange('rating', newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={10}
        step={0.5}
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={clearFilters}
          sx={{ mr: 2 }}
        >
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
};

// Helper function to get genre name from ID
const getGenreName = (genreId) => {
  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };
  return genreMap[genreId] || 'Unknown';
};

export default MovieFilters;