import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkerSelectionModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const WorkerSelectionModal = ({ worker }) => {
  const navigate = useNavigate();

<<<<<<< HEAD
 
=======
  // Props chaina vane placeholder data use hunchha
>>>>>>> 5dcbb72bca04fb3d81235e5e8bfbccb0c8197c5d
  const displayWorker = worker || { 
    name: "Bishal Pokhrel", 
    role: "निर्माण / घरकाम / कृषि / अन्य", 
    img: "/8.png" 
  };

  return (
    <div className="modal-overlay-selection">
      <div className="modal-content-selection">
        <button className="close-x" onClick={() => navigate(-1)}>&times;</button>
        
        <h2 className="modal-main-title">विवरण / PROFILE</h2>

        <div className="profile-container">
          <div className="profile-left">
            <div className="avatar-wrapper">
              {/* FIXED: 7.png lai string quotes vitra rakhiyeko chha */}
              <img src="/7.png" alt="Worker" className="profile-img-large" />
            </div>
            <div className="review-box">
              <p>समीक्षा / Review</p>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />
                ))}
                <span className="rating-num">5.0</span>
              </div>
            </div>
          </div>

          <div className="profile-right">
            <div className="info-grid">
              <div className="info-item">
                <label>नाम/Name</label>
                <input type="text" value={displayWorker.name} readOnly />
              </div>
              <div className="info-item">
                <label>उमेर/Age</label>
                <div className="age-input-wrapper">
                  <input type="text" value="२५ वर्ष" readOnly />
                  <span className="status-dot"></span>
                </div>
              </div>
              <div className="info-item">
                <label>फोन नम्बर/Phone No.</label>
                <input type="text" value="98XXXXXXXX" readOnly />
              </div>
              <div className="info-item">
                <label>ठेगाना/Address</label>
                <input type="text" value="काठमाडौँ, नेपाल" readOnly />
              </div>
              <div className="info-item full-width highlight-border">
                <label>कामको प्रकार</label>
                <input type="text" value={displayWorker.role} readOnly />
              </div>
              <div className="info-item full-width">
                <label>प्रस्ताव गरिएको मूल्य</label>
                <input type="text" value="Rs. 5000" className="price-input" readOnly />
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-accept" onClick={() => navigate('/Payment')}>
                स्वीकार गर्नु
              </button>
              <button className="btn-reject" onClick={() => navigate(-1)}>
                स्वीकार नगर्नु
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerSelectionModal;