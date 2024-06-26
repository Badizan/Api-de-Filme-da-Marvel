import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import '../src/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;
