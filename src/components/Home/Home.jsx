// src/components/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  IconButton, 
  TextField, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CircularProgress,
  Pagination
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { API_KEY, API_BASE_URL } from '../../config'; // Create this config file

const Home = ({ toggleDarkMode, darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showTrending, setShowTrending] = useState(true);

  // Fetch trending movies on initial load
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  // Search movies when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setShowTrending(true);
      return;
    }

    const searchMovies = async () => {
      setSearchLoading(true);
      setShowTrending(false);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setSearchLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        searchMovies();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Movie Explorer</Typography>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      
      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
        />
      </Box>

      {/* Loading Indicators */}
      {(loading || searchLoading) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Trending Movies Section */}
      {showTrending && !loading && (
        <>
          <Typography variant="h5" sx={{ mb: 3 }}>Trending This Week</Typography>
          <Grid container spacing={3}>
            {trendingMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Search Results Section */}
      {!showTrending && !searchLoading && (
        <>
          <Typography variant="h5" sx={{ mb: 3 }}>
            {movies.length > 0 ? `Search Results for "${searchQuery}"` : 'No results found'}
          </Typography>
          
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

// Movie Card Component
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6
        }
      }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <CardMedia
        component="img"
        sx={{ 
          height: 400,
          objectFit: 'cover'
        }}
        image={
          movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/no-poster.jpg' // Add a placeholder image in public folder
        }
        alt={movie.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date && new Date(movie.release_date).getFullYear()}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Rating: {movie.vote_average?.toFixed(1)}/10
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Home;