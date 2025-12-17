import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movies } from "../data/Movies";
import "./MovieDetail.css";
import { useAuth } from "../context/UserContext";
import { API_URL } from "../Config";
import axios from "axios";

export const MovieDetail = () => {
  const { id } = useParams(); // Main -> URL -> MovieDetail
  const { user } = useAuth();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("영화 상세 데이터 로딩 실패:", error);
        alert("영화 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchMovies();
  }, [id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (userRating > 0 && comment.trim()) {
      const newReview = {
        id: Date.now(),
        user: user.name,
        rating: userRating,
        comment: comment.trim(),
        date: new Date().toLocaleDateString("ko-KR"),
      };

      const updatedReviews = [newReview, ...reviews];
      saveReviews(updatedReviews);

      setUserRating(0);
      setComment("");
      alert("리뷰가 등록되었습니다!");
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      const updatedReviews = reviews.filter((review) => review.id !== reviewId);
      saveReviews(updatedReviews);
      alert("리뷰가 삭제되었습니다.");
    }
  };

  const handleStartEdit = (review) => {
    setEditingId(review.id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditComment("");
    setEditRating(0);
  };

  const handleSaveEdit = (reviewId) => {
    if (editRating > 0 && editComment.trim()) {
      const updatedReviews = reviews.map((review) =>
        review.id === reviewId
          ? { ...review, rating: editRating, comment: editComment.trim() }
          : review
      );
      saveReviews(updatedReviews);
      setEditingId(null);
      setEditComment("");
      setEditRating(0);
      alert("리뷰가 수정되었습니다!");
    }
  };

  if (!movie) {
    return <div className="loading">영화를 찾을 수 없습니다...</div>;
  }

  return (
    <div className="movie-detail-page">
      <div className="detail-container">
        <div className="detail-header">
          <div className="detail-poster-wrapper">
            <img
              src={movie.posterUrl}
              alt={movie.titleKo}
              className="detail-poster"
            />
          </div>

          <div className="detail-info">
            <div className="detail-title-section">
              <h1 className="detail-title">{movie.titleKo}</h1>
              <p className="detail-original-title">{movie.title}</p>
            </div>

            <div className="detail-rating-wrapper">
              <div className="rating-badge">
                <span className="star">★</span>
                <span>{movie.rating.toFixed(1)}</span>
              </div>
              <span className="divider">·</span>
              <span className="year">{movie.year}</span>
            </div>

            {/* <div className="detail-genre-list">
              {movie.genre.map((genre, index) => (
                <span key={index} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div> */}
            <div className="detail-genre-list">
              {movie.genre.split(",").map((genre, index) => (
                <span key={index} className="genre-tag">
                  {genre.trim()}
                </span>
              ))}
            </div>

            <div className="detail-credits">
              <p>
                <strong>감독:</strong> {movie.director}
              </p>
              <p>
                {/* <strong>출연:</strong> {movie.cast.join(", ")} */}
                <strong>출연:</strong>{" "}
                {movie.cast
                  .split(",")
                  .map((actor) => actor.trim())
                  .join(", ")}
              </p>
            </div>

            <div className="detail-synopsis">
              <h3>줄거리</h3>
              <p>{movie.synopsis}</p>
            </div>
          </div>
        </div>

        <div className="detail-review-section">
          <div className="review-form-wrapper">
            <h3>평가하기</h3>
            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setUserRating(rating)}
                    onMouseEnter={() => setHoverRating(rating)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="rating-star"
                  >
                    <span
                      className={
                        rating <= (hoverRating || userRating)
                          ? "star active"
                          : "star"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="리뷰를 작성해주세요"
                className="review-textarea"
              />
              <button
                type="submit"
                className="review-submit"
                disabled={userRating === 0 || !comment.trim()}
              >
                등록
              </button>
            </form>
          </div>

          <div className="reviews-list">
            <h3>리뷰 ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <p className="no-reviews">아직 작성된 리뷰가 없습니다.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-avatar">
                      {review.user ? review.user.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div className="review-content">
                      {editingId === review.id ? (
                        <div className="review-edit-form">
                          <div className="rating-input">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => setEditRating(rating)}
                                className="rating-star"
                              >
                                <span
                                  className={
                                    rating <= editRating
                                      ? "star active"
                                      : "star"
                                  }
                                >
                                  ★
                                </span>
                              </button>
                            ))}
                          </div>
                          <textarea
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            className="review-textarea"
                          />
                          <div className="review-actions">
                            <button
                              onClick={() => handleSaveEdit(review.id)}
                              className="btn-save"
                            >
                              저장
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="btn-cancel"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="review-meta">
                            <div className="review-user-info">
                              <span className="review-user">
                                {review.user || "익명"}
                              </span>
                              <div className="review-rating">
                                <span className="star">★</span>
                                <span>{review.rating}</span>
                              </div>
                            </div>
                          </div>
                          <p className="review-comment">{review.comment}</p>
                          <div className="review-footer">
                            <span className="review-date">{review.date}</span>
                            <div className="review-actions">
                              <button
                                onClick={() => handleStartEdit(review)}
                                className="btn-edit"
                              >
                                수정
                              </button>
                              <button
                                onClick={() => handleDeleteReview(review.id)}
                                className="btn-delete"
                              >
                                삭제
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
