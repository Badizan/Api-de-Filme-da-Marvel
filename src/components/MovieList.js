import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../components/MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = useCallback(async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        api_key: 'e98b3a1761a896ce4238c7df3bd2fc42',
        with_companies: 420, // ID da Marvel Studios
        page: page
      }
    });
    setMovies(response.data.results);
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-list-container">
      <h1>Filmes da Marvel</h1>
      <input 
        type="text" 
        placeholder="Pesquisar por título..." 
        value={searchTerm} 
        onChange={handleSearch} 
        className="search-bar"
      />
      <div className="movie-list">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="movie-item">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>Data de lançamento: {movie.release_date}</p>
            <Link to={`/movie/${movie.id}`} className="details-button">Ver detalhes</Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
        <button onClick={() => setPage(page + 1)}>Próxima</button>
      </div>
    </div>
  );
};

export default MovieList;
