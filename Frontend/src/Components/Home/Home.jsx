import React from 'react';
import Navbar from '../Navbar/Navbar'; // Navbar ko sahi path check gara hai
import './Home.css';

const Home = () => {
  const jobData = [
    { id: 1, title: 'भवन निर्माण (Build House)', count: '23 / 30', category: 'घरवान / निर्माण मजदुरको लागि अवसर' },
    { id: 2, title: 'घरकाम (Clean House)', count: '0 / 1', category: 'घरवान / निर्माण मजदुरको लागि अवसर' },
    { id: 3, title: 'घरकाम (Clean House)', count: '2 / 2', category: 'घरवान / निर्माण मजदुरको लागि अवसर' },
  ];

  return (
    <div className="home-container">
      {/* Naya Navbar yaha add gareko chu */}
      <Navbar /> 

      <main className="content-area" style={{ marginTop: '90px' }}> {/* Navbar fixed bhayekoले margin thapeko */}
        <div className="main-feed">
          
          <div className="section-title">
            <h3>काम / Work</h3>
            <div className="filter-text">
              <span className="filter-icon">🚩</span> छनोट / Filter
            </div>
          </div>

          <div className="job-grid">
            {jobData.map((job) => (
              <div className="job-card" key={job.id}>
                <div className="img-box">
                  <img src="/work-sample.png" alt="work" />
                </div>
                <h4>{job.title}</h4>
                <div className="user-count">👤 {job.count}</div>
                <p className="category-text">{job.category}</p>
                <button className="apply-btn">आवेदन</button>
              </div>
            ))}
          </div>

          <div className="section-title" style={{ marginTop: '40px' }}>
            <h3>अधिकतम पारिश्रमिक</h3>
          </div>

          <div className="job-grid">
            {jobData.map((job) => (
              <div className="job-card" key={`wage-${job.id}`}>
                <div className="img-box">
                  <img src="/work-sample.png" alt="work" />
                </div>
                <h4>{job.title}</h4>
                <div className="user-count">👤 {job.count}</div>
                <p className="category-text">{job.category}</p>
                <button className="apply-btn">आवेदन</button>
              </div>
            ))}
          </div>
        </div>

        <div className="side-design">
          <img src="/side.png" alt="" />
        </div>
      </main>
    </div>
  );
};

export default Home;