import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Navigate ko lagi thapiyo
import './RatingPop.css';

const RatingPop = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  // Default worker name (Pachhi props bata lina sakinchha)
  const workerName = "राम बहादुर";

  const handleClose = () => {
    navigate(-1); // App.jsx ma window.history.back garnu bhanda yo safe hunchha
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("कृपया कम्तिमा एक तारा (Star) रोज्नुहोस्।");
      return;
    }
    console.log("Feedback Received:", { rating, comment, workerName });
    alert("तपाईंको प्रतिक्रिया प्राप्त भयो। धन्यवाद!");
    navigate('/home'); // Submit pachi home ma pathaidine
  };

  return (
    <div className="rating-overlay">
      <div className="rating-card">
        <button className="close-btn" onClick={handleClose}>&times;</button>
        
        <div className="rating-header">
          <div className="check-icon">✓</div>
          <h2>काम सम्पन्न भयो!</h2>
          <p><b>{workerName}</b> सँगको काम कस्तो रह्यो? मूल्याङ्कन गर्नुहोस्।</p>
        </div>

        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>

        {/* Plain Comment Box (No placeholder) */}
        <textarea
          className="feedback-box"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="submit-rating-btn" onClick={handleSubmit}>
          प्रतिक्रिया पठाउनुहोस्
        </button>
      </div>
    </div>
  );
};

export default RatingPop;