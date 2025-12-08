import { useState } from 'react';
import { MovieGrid } from '../components/Movie/MovieGrid';
import { movies } from '../data/Movies';
import { useNavigate } from 'react-router-dom';
import './Main.css';

export const Main = () => {
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`)
  };


  return (
    <div className="main-container">
      <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};

export default Main;