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
        // setMovies(response.data); map 오류
        setMovies(response.data.movies);
        console.log(response.data);
        // console.log("영화 목록 불러오기: ", response.data.movies);
        // console.log("영화 목록: ", movies); 비동기 처리여서 로그 찍는 시점이 상태 업데이트 보다 빨라서 출력 안됨
      } catch (error) {
        console.error("영화를 불러오기 실패: ", error);
      }
    };

    fetchMovies();
  }, []);

  // useEffect(() => {
  //   console.log("영화 목록 불러오기: ", movies);
  // }, [movies]);

  const handleMovieClick = (movie) => {
    // navigate(`/movie/${movie.id}`);
    //navigate(`/movie/movie.movieNo`); //문자열로 들어감
    navigate(`/movie/${movie.movieNo}`);
    console.log("영화 번호:", movie.movieNo);
  };

  return (
    <div className="main-container">
      <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};

export default Main;
