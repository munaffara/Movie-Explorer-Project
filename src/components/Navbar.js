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
    <AppBar
      position="sticky" 
      sx={{
        backgroundColor: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid #e50914',
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            color: '#e50914',
            textShadow: '0 0 8px #e50914',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: '#e50914' }}>
            Movie Explorer
          </Link>
        </Typography>

        {isAuthenticated && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              component={Link}
              to="/favorites"
              sx={{ color: '#fff', '&:hover': { color: '#e50914' }, mr: 1 }}
            >
              <FavoriteIcon />
            </IconButton>

            <IconButton
              onClick={toggleTheme}
              sx={{ color: '#fff', '&:hover': { color: '#e50914' }, mr: 2 }}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <Button
              color="inherit"
              onClick={logout}
              sx={{
                bgcolor: '#e50914',
                color: '#fff',
                fontWeight: 'bold',
                px: 2,
                '&:hover': {
                  bgcolor: '#b0060f',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
