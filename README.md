# Movie Explorer 

## Project Overview

Movie Explorer is a React-based web application that allows administrators to browse, search, and manage movies using data from the TMDb API. The application features a secure login system, movie browsing interface, detailed movie information pages, and favorites management.

## Key Features

- **Secure Authentication System**
  - Admin login with protected routes
  - Session persistence using localStorage
  - Static credentials for demo purposes

- **Movie Browsing & Search**
  - View trending movies
  - Search for specific movies
  - Filter movies by genre, year, and rating
  - Infinite scroll for search results

- **Movie Details**
  - Comprehensive movie information
  - Cast details
  - Embedded trailers
  - Favorite management

- **User Experience**
  - Responsive design
  - Dark/light theme toggle
  - Smooth animations and transitions
  - Intuitive navigation

- **Technical Features**
  - Context API for state management
  - Material-UI for styling
  - React Router for navigation
  - Axios for API requests

## Project Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- TMDb API key (free tier available)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/munaffara/Movie-Explorer-Project.git
   cd movie-explorer
   ```

2. Install dependencies:
   ```bash
   npm install

   ```

3. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser to `http://localhost:3000`

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (advanced)

## API Usage

This application uses the [TMDb API](https://www.themoviedb.org/documentation/api) to fetch movie data. The following endpoints are used:

- `/` - Get trending movies
- `/movie/{movie_id}` - Get movie details

### Authentication

The admin portal uses static credentials for demonstration purposes:

- **Username**: `movieadmin`
- **Password**: `movies123`

These credentials are hardcoded in the Login component for demo purposes only. In a production environment, you would implement proper authentication with a backend service.


## Customization

### Themes

The application supports light and dark themes. You can customize the theme colors in `src/context/ThemeContext.js`.

### Styling

The application uses Material-UI for styling with custom theme overrides. You can modify the styles in individual components or update the base theme.

## Deployment

To deploy this application:

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deployment 
   ```npm install -g vercel
vercel```

