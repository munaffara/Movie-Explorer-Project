import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Button,
  CircularProgress,
  Alert,
  Grid,
  CardMedia,
  Rating,
  Paper
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MovieContext } from '../context/MovieContext';
import api from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorites, favorites } = useContext(MovieContext);
  const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${id}`, {
          params: {
            append_to_response: 'videos,credits'
          }
        });
        setMovie(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.status_message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (movie && favorites) {
      setIsFavorite(favorites.some(fav => fav.id === movie.id));
    }
  }, [movie, favorites]);

  const handleAddToFavorites = () => {
    if (movie) {
      addToFavorites(movie);
      setIsFavorite(true);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <CircularProgress />
    </Box>
  );
  
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!movie) return <Alert severity="info">Movie not found</Alert>;

  // Extract top 5 cast members
  const cast = movie.credits?.cast?.slice(0, 5) || [];

  return (
    <Box sx={{ 
      maxWidth: 1200, 
      mx: 'auto', 
      p: 4,
      display: 'flex',
      gap: 6
    }}>
      {/* Left Side - Poster Image */}
      <Box sx={{ 
        flex: '0 0 420px',
        height: 'fit-content',
        position: 'sticky',
        top: 20
      }}>
        <CardMedia
          component="img"
          image={movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/no-poster.png'}
          alt={movie.title}
          sx={{ 
            borderRadius: 2, 
            width: '100%',
            boxShadow: 3
          }}
        />
      </Box>

      {/* Right Side - Details */}
      <Box sx={{ flex: 1 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            mb: 1
          }}
        >
          {movie.title}
        </Typography>
        
        {/* Genre Chips - placed right below title like in the image */}
        

        <Box sx={{ my: 2 }}>
            {movie.genres.map(genre => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
        </Box>

        {/* Overview */}
        <Typography paragraph sx={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.6,
          mb: 4 
        }}>
          {movie.overview || 'No overview available.'}
        </Typography>

        {/* Details Section */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          mb: 4,
          backgroundColor: 'background.paper',
          borderRadius: 2
        }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2" color="text.secondary">Release Date:</Typography>
              <Typography variant="body1">{movie.release_date || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2" color="text.secondary">Runtime:</Typography>
              <Typography variant="body1">{movie.runtime || 'N/A'} min</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2" color="text.secondary">Language:</Typography>
              <Typography variant="body1">{movie.original_language.toUpperCase()}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2" color="text.secondary">Rating:</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Rating
                  value={movie.vote_average / 2}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <Typography variant="body1">
                  {movie.vote_average.toFixed(1)}/10
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Favorite Button */}
        <Button
          variant={isFavorite ? "outlined" : "contained"}
          startIcon={<FavoriteIcon />}
          onClick={handleAddToFavorites}
          disabled={isFavorite}
          size="large"
          sx={{ 
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 'bold',
            mb: 4
          }}
        >
          {isFavorite ? "In Favorites" : "Add to Favorites"}
        </Button>

        {/* Cast Section */}
        {cast.length > 0 && (
          <>
            <Divider sx={{ my: 4 }} />
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                mb: 3
              }}
            >
              Cast
            </Typography>
            <Grid container spacing={2}>
              {cast.map(person => (
                <Grid item xs={6} sm={4} md={3} key={person.id}>
                  <Typography variant="body1" fontWeight="medium">
                    {person.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {person.character}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Trailer Section */}
        {movie.videos?.results?.some(v => v.site === 'YouTube' && v.type === 'Trailer') && (
          <>
            <Divider sx={{ my: 4 }} />
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                mb: 2
              }}
            >
              Trailer
            </Typography>
            <Box sx={{ position: 'relative', pt: '56.25%', mb: 4 }}>
              <iframe
                title="trailer"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${
                  movie.videos.results.find(v => v.site === 'YouTube' && v.type === 'Trailer').key
                }`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  borderRadius: '8px',
                  boxShadow: 3
                }}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MovieDetails;