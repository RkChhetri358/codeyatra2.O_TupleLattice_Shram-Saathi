import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


export default function Pragati() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve the work data from the button click state
  const selectedWork = location.state?.work;

  if (!selectedWork) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h2>डाटा लोड हुन सकेन (Data not found)</h2>
        <button className="btn-orange-consumer" onClick={() => navigate('/ConsumerHome')}>
          फिर्ता जानुहोस्
        </button>
      </div>
    );
  }

  return (
    <div className="modal-overlay-consumer" style={{ display: 'flex' }}>
      <div className="modal-box-consumer wide-update-modal">
        {/* Close button that goes back */}
        <span className="modal-close orange-x" onClick={() => navigate(-1)}>
          &times;
        </span>

        <h2 className="modal-title-top">
          {selectedWork.project_name}
        </h2>

        <div className="modal-top-section">
          <div className="modal-image-status">
            <img
              src={selectedWork.file_path ? `http://127.0.0.1:8000/${selectedWork.file_path}` : "/1.png"}
              className="modal-job-img-large"
              alt="Job"
            />
            <p className="status-label">
              Status : <span className="status-val">प्रक्रियामा</span>
            </p>
          </div>

          <div className="modal-details-grid">
            <div className="m-input">
              <label>कामको नाम / शीर्षक</label>
              <input value={selectedWork.project_name} readOnly />
            </div>
            <div className="m-input">
              <label>समय अवधि</label>
              <input value={selectedWork.duration} readOnly />
            </div>
            <div className="m-input">
              <label>फोन नम्बर</label>
              <input value={selectedWork.phone_number || "उपलब्ध छैन"} readOnly />
            </div>
            <div className="m-input">
              <label>ठेगाना</label>
              <input value={selectedWork.address} readOnly />
            </div>
          </div>
        </div>

        <div className="center-action" style={{marginTop: '30px'}}>
           <button 
             className="btn-orange-consumer-pragati" 
             onClick={() => navigate(-1)}
             style={{width: '200px'}}
           >
             बन्द गर्नुहोस् (Close)
           </button>
        </div>
      </div>
    </div>
  );
}