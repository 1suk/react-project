import { useEffect, useState } from "react";
import { MovieGrid } from "../components/Movie/MovieGrid";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import { API_URL } from "../Config";
import axios from "axios";

export const Main = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/movie`);
        setMovies(response.data);
        //setMovies(response.data.movies); map 오류
      } catch (error) {
        console.error("영화를 불러오기 실패: ", error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="main-container">
      <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};

export default Main;
