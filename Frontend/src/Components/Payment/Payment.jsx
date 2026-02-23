import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = ({ proposedPrice, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 

  const advanceAmount = proposedPrice * 0.20;

 
  const qrData = encodeURIComponent(`Payment for TupleLattice: Rs. ${advanceAmount}`);
  const qrChartUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;

  const handleFinalSubmit = () => {
    setStep(3); 
  };

  return (
    <div className="pay-modal-overlay">
      <div className="pay-modal-card">
        {step !== 3 && <button className="pay-close-x" onClick={onClose}>&times;</button>}
        
        {step === 1 && (
          <div className="pay-content-box">
            <div className="pay-main-icon">💰</div>
            <h2 className="pay-title">अग्रिम भुक्तानी (Advance Payment)</h2>
            <p className="pay-subtitle">काम सुरु गर्नका लागि २०% अग्रिम भुक्तानी गर्नुहोस्।</p>
            <div className="pay-summary-box">
              <div className="pay-summary-row">
                <span>प्रस्तावित मूल्य:</span>
                <span>Rs. {proposedPrice}</span>
              </div>
              <div className="pay-summary-row pay-total-bold">
                <span>अग्रिम रकम (२०%):</span>
                <span>Rs. {advanceAmount}</span>
              </div>
            </div>
            <button className="pay-primary-btn" onClick={() => setStep(2)}>Proceed to Pay</button>
          </div>
        )}

        {step === 2 && (
          <div className="pay-content-box pay-qr-center">
            <h2 className="pay-title">स्क्यान गरी भुक्तानी गर्नुहोस्</h2>
            <p className="pay-subtitle">Scan to pay for <b>TupleLattice</b></p>
            <div className="pay-qr-wrapper">
              <img src={qrChartUrl} alt="QR" className="pay-qr-img" />
            </div>
            <button className="pay-done-btn" onClick={handleFinalSubmit}>मैले भुक्तानी गरिसकेँ</button>
            <button className="pay-back-btn" onClick={() => setStep(1)}>Back</button>
          </div>
        )}

        {step === 3 && (
          <div className="pay-content-box pay-success-state">
            <div className="pay-success-icon">✅</div>
            <h2 className="pay-success-title">भुक्तानी सफल भयो!</h2>
            <div className="pay-status-badge">Worker is Selected</div>
            <p className="pay-success-desc">तपाईंको कामदार छनोट भइसकेको छ। उहाँ छिट्टै तपाईंको सम्पर्कमा आउनुहुनेछ।</p>
            <button className="pay-primary-btn" onClick={()=>navigate('/ConsumerHome')}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;