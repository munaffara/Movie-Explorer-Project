import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Favorites = ({ toggleDarkMode, darkMode }) => {
  // In a real implementation, you would get favorites from local storage
  const [favorites, setFavorites] = React.useState([]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">My Favorites</Typography>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      
      {favorites.length === 0 ? (
        <Typography>You haven't added any favorites yet.</Typography>
      ) : (
        <Box>
          {/* Favorites list would go here */}
          <Typography>Your favorite movies will appear here</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Favorites;