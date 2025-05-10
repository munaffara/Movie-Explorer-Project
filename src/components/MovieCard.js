// src/components/MovieCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea, Rating, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const theme = useTheme(); // Get the current theme

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  // Theme-dependent styles
  const cardBackground = theme.palette.mode === 'dark' ? '#424242' : '#ffffff';
  const textColor = theme.palette.mode === 'dark' ? 'white' : 'black';
  const shadowColor = theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <Card
      sx={{
        width: 200,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        backgroundColor: cardBackground, // Card background based on theme
        boxShadow: `0 2px 8px ${shadowColor}`, // Card shadow based on theme
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)', // Hover effect
        },
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ p: 1.5 }}>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            noWrap
            sx={{ color: textColor }} // Text color based on theme
          >
            {movie.title}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary" sx={{ color: textColor }}>
              {movie.release_date && movie.release_date.substring(0, 4)}
            </Typography>
            <Box display="flex" alignItems="center">
              <Rating
                name="read-only"
                value={movie.vote_average / 2}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="body2" ml={0.5} sx={{ color: textColor }}>
                {movie.vote_average.toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
