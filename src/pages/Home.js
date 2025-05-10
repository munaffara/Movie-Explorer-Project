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
      setFilteredMovies(null); // Reset filters when new search results come in
    } else {
      setShowTrending(true);
    }
  }, [searchResults]);

  const handleFilterChange = (filtered) => {
    // Ensure we're filtering the correct source (searchResults or trendingMovies)
    const sourceMovies = showTrending ? trendingMovies : searchResults;
    setFilteredMovies(filtered);
  };

  // Helper to get movies to display
  const getMoviesToDisplay = () => {
    if (filteredMovies) return filteredMovies;
    return showTrending ? trendingMovies : searchResults;
  };

  const moviesToDisplay = getMoviesToDisplay();

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, padding: 3 }}>
      <Box sx={{ mb: 4 }}>
        <SearchBar />
        {!showTrending && (
          <>
            <Button
              startIcon={<FilterListIcon />}
              onClick={() => setShowFilters(!showFilters)}
              sx={{ mt: 2 }}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <Collapse in={showFilters}>
              <MovieFilters 
                movies={searchResults} 
                onFilterChange={handleFilterChange} 
              />
            </Collapse>
          </>
        )}
      </Box>
      
      {loading && page === 1 ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
            {showTrending ? 'Trending Movies' : 'Search Results'}
          </Typography>
          
          {moviesToDisplay.length === 0 ? (
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              No movies found matching your criteria.
            </Typography>
          ) : (
            <>
              <Grid container spacing={4}>
                {moviesToDisplay.map(movie => (
                  <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))}
              </Grid>
              
              {!showTrending && page < totalPages && !filteredMovies && (
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
        </>
      )}
    </Container>
  );
};

export default Home;