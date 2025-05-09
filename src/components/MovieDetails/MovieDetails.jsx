import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const MovieDetails = ({ toggleDarkMode, darkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real implementation, you would fetch movie details based on the id
  const [movie, setMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Mock data - in real app you would fetch from API
      setMovie({
        id: id,
        title: "Sample Movie",
        overview: "This is a sample movie description.",
        release_date: "2023-01-01",
        vote_average: 7.5,
        poster_path: "/placeholder.jpg"
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={() => navigate(-1)} color="inherit">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Movie Details</Typography>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography variant="h3">{movie?.title}</Typography>
          <Typography variant="subtitle1">Release Date: {movie?.release_date}</Typography>
          <Typography variant="subtitle1">Rating: {movie?.vote_average}/10</Typography>
          <Typography paragraph sx={{ mt: 2 }}>{movie?.overview}</Typography>
          {/* More details would go here */}
        </Box>
      )}
    </Box>
  );
};

export default MovieDetails;