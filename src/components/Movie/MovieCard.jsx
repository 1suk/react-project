import './MovieCard.css';

export const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <div className="movie-card-poster">
        <img 
          src={movie.posterUrl} 
          alt={movie.titleKo}
          className="movie-card-image"
        />
      </div>
      
      <div className="movie-card-info">
        <h3 className="movie-card-title">
          {movie.titleKo}
        </h3>
        <div className="movie-card-meta">
          <div className="movie-card-rating">
            <span className="star">★</span>
            <span>{movie.rating.toFixed(1)}</span>
          </div>
          <span className="divider">·</span>
          <span className="year">{movie.year}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard