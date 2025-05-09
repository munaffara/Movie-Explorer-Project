import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Home = ({ toggleDarkMode, darkMode }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Movie Explorer</Typography>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      
      <Typography variant="h5" sx={{ mb: 3 }}>Trending Movies</Typography>
      {/* Movie grid will go here */}
      
      <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>Search Movies</Typography>
      {/* Search bar will go here */}
    </Box>
  );
};

export default Home;