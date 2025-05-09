// src/components/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  CssBaseline, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from auth context

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    // Mock validation - in real app you'd verify with backend
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Store user in localStorage
    localStorage.setItem('movieExplorerUser', JSON.stringify({ username }));
    
    // Update auth state using context
    login();
    
    // Navigate to home page
    navigate('/');
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <MovieFilterIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Movie Explorer
          </Typography>
          
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Demo credentials: any username with password 6+ characters
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Login;