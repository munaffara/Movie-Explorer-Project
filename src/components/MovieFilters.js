import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useTheme,
  CircularProgress
} from '@mui/material';
import { MovieContext } from '../context/MovieContext';

const MovieFilters = ({ onFilterChange }) => {
  const { searchResults, trendingMovies, genres, loadingGenres } = useContext(MovieContext);
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const yearRange = [1980, currentYear];

  const [filters, setFilters] = useState({
    genre: '',
    year: [1990, currentYear],
    rating: [0, 10]
  });

  // Get unique genre IDs from movies that exist in our genres list
  const availableGenreIds = [
    ...new Set(
      [...trendingMovies, ...searchResults]
        .flatMap(movie => movie.genre_ids || [])
        .filter(id => genres?.some(g => g.id === id)) // Only keep IDs that exist in genres
    )
  ];

  // Apply filters whenever they change
  useEffect(() => {
    const moviesToFilter = searchResults.length > 0 ? searchResults : trendingMovies;
    
    const filtered = moviesToFilter.filter(movie => {
      // Genre filter - convert both to numbers for comparison
      if (filters.genre && !movie.genre_ids?.some(id => id === Number(filters.genre))) {
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

    onFilterChange(filtered);
  }, [filters, searchResults, trendingMovies, onFilterChange]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      genre: '',
      year: [1990, currentYear],
      rating: [0, 10]
    });
  };

  if (loadingGenres) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress size={24} />
      </Box>
    );
  }

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
          disabled={!genres || genres.length === 0}
        >
          <MenuItem value="">All Genres</MenuItem>
          {availableGenreIds.map(genreId => {
            const genre = genres.find(g => g.id === genreId);
            return (
              <MenuItem key={genreId} value={String(genreId)}> {/* Convert to string for Select */}
                {genre?.name || 'Unknown'}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Typography gutterBottom sx={{ mt: 2 }}>
        Release Year: {filters.year[0]} - {filters.year[1]}
      </Typography>
      <Slider
        value={filters.year}
        onChange={(_, newValue) => handleFilterChange('year', newValue)}
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
        onChange={(_, newValue) => handleFilterChange('rating', newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={10}
        step={0.5}
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="button"
          variant="outlined"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
};

export default MovieFilters;