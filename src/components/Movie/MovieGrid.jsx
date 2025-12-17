import { MovieCard } from "./MovieCard";
import "./MovieGrid.css";

export function MovieGrid({ movies, onMovieClick }) {
  return (
    <div className="movie-grid-container">
      <h2 className="movie-grid-title">인기 영화</h2>

      <div className="movie-grid">
        {movies.map((movie) => (
          // <MovieCard
          //   key={movie.id}
          //   movie={movie}
          //   onClick={onMovieClick}
          // />
          <MovieCard
            key={movie.movieNo}
            movie={movie}
            onCardClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
}
