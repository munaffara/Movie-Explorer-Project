// src/components/Navbar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Movie Explorer
          </Link>
        </Typography>
        {isAuthenticated && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                component={Link}
                to="/favorites"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 2 }}>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;