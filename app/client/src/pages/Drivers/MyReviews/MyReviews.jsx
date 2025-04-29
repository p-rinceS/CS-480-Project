import { useEffect, useState } from "react";
import "./MyReviews.css";
import { getDriverReviews } from "../../../services/apiService";

/**
 * A driver might have received some reviews.
 * A review consists of a message and a rating (integer 0–5).
 * A review is uniquely identified by driver and reviewId.
 */

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewList = await getDriverReviews();
      setReviews(reviewList || []);
    };
    fetchReviews();
  }, []);

  return (
    <div id="my-reviews-page">
      <h2>My Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="review-list">
          {reviews.map(({ reviewId, message, rating }) => (
            <li key={reviewId} className="review-item">
              <div className="rating">⭐ {rating} / 5</div>
              <p className="message">{message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReviews;
