// src/pages/MoviePage.js
import React from 'react';
import { Container, useTheme } from '@mui/material';
import MovieDetails from '../components/MovieDetails';

const MoviePage = () => {
  const theme = useTheme(); // Get the current theme

  // Theme-dependent styling
  const backgroundColor = theme.palette.mode === 'dark' ? '#333' : '#f9f9f9';
  const textColor = theme.palette.mode === 'dark' ? 'white' : 'black';
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
      <MovieDetails />
    </Container>
  );
};

export default MoviePage;
