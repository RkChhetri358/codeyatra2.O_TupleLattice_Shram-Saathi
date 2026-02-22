import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; 
import axios from 'axios';
import './ConsumerHome.css';

const ConsumerHome = () => {
  const [myWorks, setMyWorks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    const fetchMyWorks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/consumer/works");
        setMyWorks(response.data);
      } catch (err) {
        setMyWorks([
          { id: 1, title: 'भवन निर्माण (Build House)', count: '23 / 30', img: '/1.png' },
          { id: 2, title: 'घरकाम (Clean House)', count: '0 / 1', img: '/2.png' },
          { id: 3, title: 'घरकाम (Clean House)', count: '2 / 2', img: '/3.png' },
        ]);
      }
    };
    fetchMyWorks();
  }, []);

  return (
    <div className={`home-wrapper ${showModal ? 'modal-active' : ''}`}>
      <Navbar />

      {/* SECTION 1: HOME */}
      <section className="main-section" id="home-section">
        <div className="top-action" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <button className="btn-orange" style={{ padding: '14px 40px' }}>नयाँ परियोजना थप्नुहोस्</button>
        </div>

        <div className="section-header">
          <h3 className="nepali-title">मेरो काम / My work</h3>
          <span className="filter-text">सबै हेर्नुहोस्</span>
        </div>

        <div className="work-grid">
          {myWorks.map((work) => (
            <div className="work-item-card" key={work.id}>
              <img src={work.img} alt="work" className="work-consumer" />
              <h4>{work.title}</h4>
              <p className="stats-orange">👤 {work.count}</p>
              <p className="sub-desc">निर्माण मजदुरको लागि अवसर</p>
              <button className="btn-orange" onClick={() => { setSelectedWork(work); setShowModal(true); }}>प्रगति</button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: PROFILE */}
      <section className="main-section profile-light-bg" id="profile-section">
        <div className="section-header">
          <h3 className="nepali-title">विवरण / PROFILE</h3>
        </div>
        
        <div className="profile-layout">
          <div className="profile-left-side">
            <img src="/user_profile.png" alt="Profile" className="avatar-circle" />
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
          </div>
          
          <div className="profile-details-form">
            <div className="form-grid">
              <div className="field-group">
                <label>नाम/Name</label>
                <input type="text" placeholder="आफ्नो नाम" />
              </div>
              <div className="field-group">
                <label>उमेर/Age</label>
                <input type="text" placeholder="आफ्नो उमेर" />
              </div>
              <div className="field-group full-span">
                <label>फोन नम्बर/Phone No.</label>
                <input type="text" placeholder="मोबाइल नम्बर" />
              </div>
              <div className="field-group full-span">
                <label>ठेगाना/Address</label>
                <input type="text" placeholder="आफ्नो ठेगाना" />
              </div>
            </div>
            <button className="save-btn">परिवर्तन सुरक्षित गर्नुहोस्</button>
          </div>
        </div>
      </section>

      {/* SECTION 3: NOTIFICATIONS */}
      <section className="main-section" id="notif-section">
        <div className="section-header">
          <h3 className="nepali-title">सूचना 🔔 / NOTIFICATIONS</h3>
        </div>
        
        <div className="notif-list">
          <div className="notif-card">
            <img src="/1.png" className="notif-img" alt="" />
            <div className="notif-info">
              <h4>आवेदन प्राप्त भयो</h4>
              <p>तपाईंको 'भवन निर्माण' प्रोजेक्टमा नयाँ आवेदन आएको छ।</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- MODAL --- */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 className="modal-title">{selectedWork?.title}</h2>
            <div className="modal-flex">
              <div className="modal-left">
                <img src={selectedWork?.img} className="modal-job-img" alt="" />
              </div>
              <div className="modal-right">
                <div className="modal-form-grid">
                  <div className="m-input"><label>कामको शीर्षक</label><input value={selectedWork?.title} readOnly /></div>
                  <div className="m-input purple-border"><label>समय अवधि</label><input placeholder="2-5 years" /></div>
                  <div className="m-input"><label>सम्पर्क नम्बर</label><input placeholder="98XXXXXXXX" /></div>
                  <div className="m-input"><label>ठेगाना</label><input placeholder="काठमाडौं" /></div>
                </div>
                <button className="modal-submit-btn">अपडेट गर्नुहोस्</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerHome;