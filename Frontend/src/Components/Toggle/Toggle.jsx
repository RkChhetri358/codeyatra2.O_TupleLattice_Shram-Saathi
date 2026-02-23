import React from "react";
import { useNavigate } from "react-router-dom";
import "./Toggle.css";
export default function Toggle() {


      const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Ratingpop");
  };
  return (
    <div>
<div className="review-switch-wrapper">
      <div className="review-switch" onClick={handleClick}>
        <div className="review-slider"></div>
      </div>
      <p className="review-label">Go to Review</p>
    </div>


    </div>
  )
}
