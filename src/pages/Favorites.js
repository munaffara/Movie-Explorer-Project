// src/pages/Favorites.js
import React, { useContext } from 'react';
import { Container, Grid, Typography, Box, Button, useTheme } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(MovieContext);
  const theme = useTheme(); // Get the current theme

  // Theme-dependent styling
  const backgroundColor = theme.palette.mode === 'dark' ? '#333' : '#f9f9f9';
  const textColor = theme.palette.mode === 'dark' ? 'white' : 'black';
  const buttonColor = theme.palette.mode === 'dark' ? '#6200ea' : '#1976d2'; // Button color based on theme
  const containerShadow = theme.palette.mode === 'dark' ? 6 : 3;

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        padding: 3,
        color: textColor, // Set text color based on theme
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: textColor }}>
        Your Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Box textAlign="center" my={4}>
          <Typography variant="h6" gutterBottom sx={{ color: textColor }}>
            You haven't added any favorites yet.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/"
            sx={{
              mt: 2,
              backgroundColor: buttonColor,
              '&:hover': { backgroundColor: theme.palette.mode === 'dark' ? '#3700b3' : '#115293' }, // Hover effect
            }}
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
