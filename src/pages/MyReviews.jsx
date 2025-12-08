import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { movies } from '../data/Movies';
import { useAuth } from '../context/UserContext';
import './MyReviews.css';

export const MyReviews = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    loadMyReviews();
  }, []);

  const loadMyReviews = () => {
    const reviewsData = [];
    
    movies.forEach(movie => {
      const savedReviews = localStorage.getItem(`movie(${movie.id})_reviews`);
      if (savedReviews) {
        const reviews = JSON.parse(savedReviews);
        
        const myMovieReviews = reviews.filter(review => review.user === user?.name);
        
        if (myMovieReviews.length > 0) {
          myMovieReviews.forEach(review => {
            reviewsData.push({
              ...review,
              movie: {
                id: movie.id,
                titleKo: movie.titleKo,
                title: movie.title,
                posterUrl: movie.posterUrl,
                year: movie.year,
                genre: movie.genre
              }
            });
          });
        }
      }
    });
  
    const sortedReviews = reviewsData.sort((a, b) => b.rating - a.rating);
    setMyReviews(sortedReviews);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="my-reviews-page">
      <div className="my-reviews-container">
        <div className="my-reviews-header">
          <h1 className="my-reviews-title">내가 본 영화</h1>
          <p className="my-reviews-count">총 {myReviews.length}편</p>
        </div>

        <div className="my-reviews-list">
          {myReviews.length === 0 ? (
            <div className="empty-state">
              <p className="empty-text">아직 평가한 영화가 없습니다.</p>
              <button 
                className="empty-button"
                onClick={() => navigate('/')}
              >
                영화 둘러보기
              </button>
            </div>
          ) : (
            myReviews.map(review => (
              <div 
                key={`${review.movie.id}-${review.id}`} 
                className="my-review-card"
                onClick={() => handleMovieClick(review.movie.id)}
              >
                <div className="review-card-poster">
                  <img 
                    src={review.movie.posterUrl} 
                    alt={review.movie.titleKo}
                  />
                </div>
                
                <div className="review-card-content">
                  <div className="review-card-header">
                    <div>
                      <h3 className="review-card-title">{review.movie.titleKo}</h3>
                      <p className="review-card-original">{review.movie.title}</p>
                    </div>
                    <div className="review-card-rating">
                      <span className="star">★</span>
                      <span className="rating-value">{review.rating}</span>
                    </div>
                  </div>

                  <div className="review-card-meta">
                    <span className="review-year">{review.movie.year}</span>
                    <span className="divider">·</span>
                    <span className="review-genres">
                      {review.movie.genre.slice(0, 2).join(', ')}
                    </span>
                  </div>

                  <p className="review-card-comment">{review.comment}</p>
                  
                  <div className="review-card-date">{review.date}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReviews;