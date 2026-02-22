import React from 'react';
import Navbar from '../Navbar/Navbar'; 
import './Home.css';

const Home = () => {
  const jobs = [
    { id: 1, title: 'भवन निर्माण (Build House)', count: '23 / 30', img: '/1.png' },
    { id: 2, title: 'घरकाम (Clean House)', count: '0 / 1', img: '/2.png' },
    { id: 3, title: 'घरकाम (Clean House)', count: '2 / 2', img: '/3.png' },
  ];

  return (
    <div className="home-wrapper">
      <Navbar />

      {/* SECTION 1: HOME */}
      <section id="home-section" className="main-section">
        <div className="section-header">
          <h3 className="nepali-title">काम / Work</h3>
          <span className="filter-text">🚩 छनोट / Filter</span>
        </div>

        <div className="work-grid">
          {jobs.map((job) => (
            <div className="work-item-card" key={job.id}>
              <img src={job.img} alt="work" className="work-pic" />
              <h4>{job.title}</h4>
              <p className="stats-orange">👤 {job.count}</p>
              <p className="sub-desc">घरवान / निर्माण मजदुरको लागि अवसर</p>
              <button className="btn-orange">आवेदन</button>
            </div>
          ))}
        </div>

        <h3 className="nepali-title" style={{ marginTop: '60px' }}>अधिकतम पारिश्रमिक</h3>
        <div className="work-grid">
          {jobs.map((job) => (
            <div className="work-item-card" key={`wage-${job.id}`}>
              <img src={job.img} alt="work" className="work-pic" />
              <h4>{job.title}</h4>
              <p className="stats-orange">👤 {job.count}</p>
              <p className="sub-desc">घरवान / निर्माण मजदुरको लागि अवसर</p>
              <button className="btn-orange">आवेदन</button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: PROFILE */}
      <section id="profile-section" className="main-section profile-light-bg">
        <div className="profile-top-bar">
          <h3 className="nepali-title">विवरण / PROFILE</h3>
          <span className="availability">उपलब्धता / Status : उपलब्ध 🟢</span>
        </div>

        <div className="profile-layout">
          <div className="profile-sidebar">
            <img src="/old_man.png" alt="User" className="avatar-circle" />
            <div className="review-stars">
              <p>समीक्षा / Review</p>
              <div className="star-row">⭐⭐⭐⭐⭐ 5.0</div>
            </div>
          </div>

          <div className="profile-details-form">
            <div className="form-grid">
              <div className="field-group">
                <label>नाम/Name</label>
                <input type="text" placeholder="आफ्नो नाम लेख्नुहोस्" />
              </div>
              <div className="field-group">
                <label>उमेर/Age</label>
                <input type="text" placeholder="आफ्नो उमेर प्रविष्ट गर्नुहोस्" />
              </div>
              <div className="field-group">
                <label>फोन नम्बर/Phone No.</label>
                <input type="text" placeholder="मोबाइल नम्बर प्रविष्ट गर्नुहोस्" />
              </div>
              <div className="field-group">
                <label>ठेगाना/Address</label>
                <input type="text" placeholder="आफ्नो ठेगाना लेख्नुहोस्" />
              </div>
              <div className="field-group full-span">
                <label>कामको प्रकार</label>
                <input type="text" placeholder="निर्माण / घरकाम / कृषि / अन्य" />
              </div>
            </div>
            <button className="save-btn">जानकारी परिवर्तन</button>
          </div>
        </div>
      </section>

      {/* SECTION 3: NOTIFICATIONS */}
      <section id="notif-section" className="main-section">
        <h3 className="nepali-title">सूचना 🔔</h3>
        <div className="notif-container">
          {[1, 2].map((i) => (
            <div className="notif-card" key={i}>
              <img src="/build.png" alt="icon" className="notif-img" />
              <div className="notif-info">
                <h4>भवन निर्माण (Build House)</h4>
                <p>-- ले तपाईंलाई यस परियोजनामा काम गर्न अनुरोध गरेका छन्।</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <img src="/side.png" alt="" className="floating-bg" />
    </div>
  );
};

export default Home;