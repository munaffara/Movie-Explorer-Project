// src/components/MovieCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea, Rating, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card sx={{ 
      width: 200, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ p: 1.5 }}>
          <Typography gutterBottom variant="subtitle1" component="div" noWrap>
            {movie.title}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
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
              <Typography variant="body2" ml={0.5}>
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