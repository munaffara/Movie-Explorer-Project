// src/pages/Home.js
import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { MovieContext } from '../context/MovieContext';

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

  useEffect(() => {
    if (searchResults.length > 0) {
      setShowTrending(false);
    } else {
      setShowTrending(true);
    }
  }, [searchResults]);

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <SearchBar />
      </Box>
      
      {loading && page === 1 ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {showTrending ? (
            <>
              <Typography variant="h5" gutterBottom>
                Trending Movies
              </Typography>
              <Grid container spacing={4}>
                {trendingMovies.map(movie => (
                  <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                Search Results
              </Typography>
              <Grid container spacing={4}>
                {searchResults.map(movie => (
                  <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))}
              </Grid>
              {page < totalPages && (
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