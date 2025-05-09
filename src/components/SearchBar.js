// src/components/SearchBar.js
import React, { useState, useContext } from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MovieContext } from '../context/MovieContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { searchMovies } = useContext(MovieContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchMovies(query);
      // Save to localStorage
      localStorage.setItem('lastSearch', query);
    }
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ width: '100%', maxWidth: 600 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;