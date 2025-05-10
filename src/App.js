// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import { ThemeContextProvider } from './context/ThemeContext';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <MovieProvider>
          <CssBaseline />
          <Router>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/favorites" element={<Favorites />} />
              </Route>
            </Routes>
          </Router>
        </MovieProvider>
      </AuthProvider>
    </ThemeContextProvider>
  );
}

export default App;