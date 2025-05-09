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
import { ThemeProvider } from '@mui/material/styles';
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
    <Router>
      <AuthProvider>
        <ThemeContextProvider>
          <MovieProvider>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/favorites" element={<Favorites />} />
              </Route>
            </Routes>
          </MovieProvider>
        </ThemeContextProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;