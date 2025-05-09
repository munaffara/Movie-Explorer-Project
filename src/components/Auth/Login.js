// src/components/Auth/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TextField, Button, Container, Box, Typography, Paper } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const staticCredentials = {
      username: 'movieadmin',
      password: 'movies123',
    };

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (
      trimmedUsername === staticCredentials.username &&
      trimmedPassword === staticCredentials.password
    ) {
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', trimmedUsername);
      login();
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
                          url('https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            borderRadius: 3,
            background: 'rgba(30, 30, 30, 0.8)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
          }}
        >
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Movie Explorer User
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Typography variant="caption" color="gray" sx={{ mt: 2, mb: 2 }}>
              <div>Username: <strong>movieadmin</strong></div>
              <div>Password: <strong>movies123</strong></div>
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: '#e50914',
                '&:hover': { bgcolor: '#b0060f' },
              }}
            >
              Sign In
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3, color: '#aaa' }}>
            Official Movie Explorer Admin Portal
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
