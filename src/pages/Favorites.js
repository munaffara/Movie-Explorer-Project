// src/pages/Favorites.js
import React, { useContext } from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(MovieContext);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Box textAlign="center" my={4}>
          <Typography variant="h6" gutterBottom>
            You haven't added any favorites yet.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/"
            sx={{ mt: 2 }}
          >
            Browse Movies
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {favorites.map(movie => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;