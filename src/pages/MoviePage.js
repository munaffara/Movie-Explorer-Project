// src/pages/MoviePage.js
import React from 'react';
import { Container } from '@mui/material';
import MovieDetails from '../components/MovieDetails';

const MoviePage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MovieDetails />
    </Container>
  );
};

export default MoviePage;