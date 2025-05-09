// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Favorites from './components/Favorites/Favorites';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <ProtectedRoute>
                  <MovieDetails toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;