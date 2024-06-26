import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../components/MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovieDetails = useCallback(async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: 'e98b3a1761a896ce4238c7df3bd2fc42'
      }
    });
    setMovie(response.data);
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  if (!movie) return <div>Carregando...</div>;

  return (
    <div className="movie-details-container">
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Data de lançamento: {movie.release_date}</p>
      <p>Avaliação: {movie.vote_average}</p>
    </div>
  );
};

export default MovieDetails;
