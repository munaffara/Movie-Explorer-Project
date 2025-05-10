// src/pages/Home.js
import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  useTheme,
  Collapse
} from '@mui/material';
import { Link } from 'react-router-dom'; // Add this import
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import MovieFilters from '../components/MovieFilters';
import { MovieContext } from '../context/MovieContext';
import FilterListIcon from '@mui/icons-material/FilterList';

const Home = () => {
  const {
    trendingMovies,
    searchResults,
    loading,
    error,
    page,
    totalPages,
    loadMore
  } = useContext(MovieContext);

  const [showTrending, setShowTrending] = useState(true);
  const theme = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(null);

  useEffect(() => {
    if (searchResults.length > 0) {
      setShowTrending(false);
      setFilteredMovies(null);
    } else {
      setShowTrending(true);
    }
  }, [searchResults]);

  const handleFilterChange = (filtered) => {
    setFilteredMovies(filtered);
  };

  const getMoviesToDisplay = () => {
    if (filteredMovies) return filteredMovies;
    return showTrending ? trendingMovies : searchResults;
  };

  if (error) return <Alert severity="error">{error}</Alert>;

  const backgroundColor = theme.palette.mode === 'dark' ? '#333' : '#f9f9f9';
  const textColor = theme.palette.mode === 'dark' ? 'white' : 'black';
  const containerShadow = theme.palette.mode === 'dark' ? 6 : 3;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, padding: 3 }}>
      <Box sx={{ mb: 4 }}>
        <SearchBar />
        <Button
          startIcon={<FilterListIcon />}
          onClick={() => setShowFilters(!showFilters)}
          sx={{ mt: 2 }}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
        <Collapse in={showFilters}>
          <MovieFilters onFilterChange={handleFilterChange} />
        </Collapse>
      </Box>

      {loading && page === 1 ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
            {showTrending ? 'Trending Movies' : 'Search Results'}
          </Typography>
          <Grid container spacing={4}>
            {getMoviesToDisplay().map(movie => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                {/* Use Link component properly */}
                <Link 
                  to={`/movie/${movie.id}`} 
                  style={{ textDecoration: 'none' }}
                  state={{ fromHome: true }} // Optional: pass state
                >
                  <MovieCard movie={movie} />
                </Link>
              </Grid>
            ))}
          </Grid>
          
          {!showTrending && page < totalPages && (
            <Box display="flex" justifyContent="center" my={4}>
              <Button
                variant="contained"
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Load More'}
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;