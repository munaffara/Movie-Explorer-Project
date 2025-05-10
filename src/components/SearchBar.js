// src/components/SearchBar.js
import React, { useState, useContext } from 'react';
import { TextField, InputAdornment, IconButton, Box, Tooltip, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { MovieContext } from '../context/MovieContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { searchMovies } = useContext(MovieContext);
  const theme = useTheme(); // Get the current theme

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchMovies(query);
      // Save to localStorage
      localStorage.setItem('lastSearch', query);
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  // Determine the styles based on the theme
  const backgroundColor = theme.palette.mode === 'dark' ? '#424242' : 'white';
  const inputBorderColor = theme.palette.mode === 'dark' ? '#666' : '#ccc';
  const iconColor = theme.palette.mode === 'dark' ? 'white' : 'black';
  const boxShadow = theme.palette.mode === 'dark' ? 6 : 3;

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        width: '100%',
        maxWidth: 600,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 2,
        boxShadow: boxShadow,
        backgroundColor: backgroundColor,
        padding: 1,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderColor: inputBorderColor, // Border color based on theme
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Search">
                <IconButton
                  type="submit"
                  sx={{
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.2)', color: iconColor },
                  }}
                >
                  <SearchIcon sx={{ color: iconColor }} />
                </IconButton>
              </Tooltip>
              {query && (
                <Tooltip title="Clear">
                  <IconButton onClick={handleClear} sx={{ marginLeft: 1 }}>
                    <ClearIcon sx={{ color: iconColor }} />
                  </IconButton>
                </Tooltip>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
