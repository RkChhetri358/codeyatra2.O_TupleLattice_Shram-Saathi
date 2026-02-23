import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./ConsumerHome.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar, faBell } from '@fortawesome/free-solid-svg-icons';

const ConsumerHome = () => {
  const [myWorks, setMyWorks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  // Mock data for workers inside the progress modal
  const workersData = [
    { id: 1, name: "Bishal Pokhrel", role: "निर्माण", img: "/8.png" },
    { id: 2, name: "Bishal Pokhrel", role: "निर्माण", img: "/8.png" },
    { id: 3, name: "Bishal Pokhrel", role: "निर्माण", img: "/8.png" },
  ];

  useEffect(() => {
    const fetchMyWorks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/consumer/works");
        setMyWorks(response.data);
      } catch (err) {
        setMyWorks([
          { id: 1, title: "भवन निर्माण (Build House)", count: "23 / 30", img: "/7.png" },
          { id: 2, title: "घरकाम (Clean House)", count: "0 / 1", img: "/2.png" },
          { id: 3, title: "घरकाम (Clean House)", count: "2 / 2", img: "/3.png" },
        ]);
      }
    };
    fetchMyWorks();
  }, []);

  return (
    <div className="home-wrapper-consumer">
      <Navbar />

      <section className="main-section-consumer" id="home-section">
        <div className="top-action" style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
          <button className="btn-orange-consumer" style={{ padding: "14px 40px" }} onClick={() => setShowAddModal(true)}>
            नयाँ परियोजना थप्नुहोस्
          </button>
        </div>

        <div className="section-header">
          <h3 className="nepali-title">मेरो काम / My work</h3>
          <span className="filter-text">सबै हेर्नुहोस्</span>
        </div>

        <div className="work-grid-consumer">
          {myWorks.map((work) => (
            <div className="work-item-card-consumer" key={work.id}>
              <img src={work.img} alt="work" className="work-consumer" />
              <h4>{work.title}</h4>
              <p className="stats-orange"><FontAwesomeIcon icon={faUser} /> {work.count}</p>
              <p className="sub-desc">निर्माण मजदुरको लागि अवसर</p>
              <button
                className="btn-orange-consumer-pragati"
                onClick={() => {
                  setSelectedWork(work);
                  setShowModal(true);
                }}
              >
                प्रगति
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRESS MODAL (The one from your image) */}
      {showModal && (
        <div className="modal-overlay-consumer" onClick={() => setShowModal(false)}>
          <div className="modal-box-consumer wide-update-modal" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close orange-x" onClick={() => setShowModal(false)}>&times;</span>
            
            <h2 className="modal-title-top">{selectedWork?.title}</h2>

            <div className="modal-top-section">
              <div className="modal-image-status">
                <img src={selectedWork?.img} className="modal-job-img-large" alt="Job" />
                <p className="status-label">Status : <span className="status-val">प्रक्रियामा</span></p>
              </div>

              <div className="modal-details-grid">
                <div className="m-input">
                  <label>कामको नाम / शीर्षक</label>
                  <input value={selectedWork?.title} readOnly />
                </div>
                <div className="m-input">
                  <label>समय अवधि</label>
                  <input placeholder="2-5 years" />
                </div>
                <div className="m-input">
                  <label>फोन नम्बर/Phone No.</label>
                  <input placeholder="मोबाइल नम्बर प्रविष्ट गर्नुहोस्" />
                </div>
                <div className="m-input">
                  <label>ठेगाना/Address</label>
                  <input placeholder="आफ्नो ठेगाना लेख्नुहोस्" />
                </div>
                <div className="m-input">
                  <label>कामको प्रकार</label>
                  <input placeholder="निर्माण / घरकाम / कृषि / अन्य" />
                </div>
                <div className="m-input">
                  <label>आवश्यक श्रमिक संख्या</label>
                  <input placeholder="20" />
                </div>
              </div>
            </div>

            <div className="center-action">
              <button className="add-worker-btn-large">श्रमिक थप्नुहोस्</button>
            </div>

            <div className="worker-list-area">
              <h3 className="section-subtitle">इच्छुक श्रमिक</h3>
              <div className="worker-row">
                {workersData.map((worker) => (
                  <div className="worker-card-mini" key={worker.id}>
                    <img src={worker.img} alt="Worker" className="worker-thumb" />
                    <p className="worker-name">{worker.name}</p>
                    <p className="worker-role">{worker.role}</p>
                    <div className="worker-stars">★★★★★</div>
                    <button className="select-btn-orange">छनौट</button>
                  </div>
                ))}
              </div>

              <h3 className="section-subtitle">श्रमिक</h3>
              <div className="worker-row">
                {workersData.map((worker) => (
                  <div className="worker-card-mini" key={`confirmed-${worker.id}`}>
                    <img src={worker.img} alt="Worker" className="worker-thumb" />
                    <p className="worker-name">{worker.name}</p>
                    <p className="worker-role">{worker.role}</p>
                    <div className="worker-stars">★★★★★</div>
                    <button className="select-btn-orange">छनौट</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PROFILE */}
      <section className="main-section profile-light-bg" id="profile-section">
        <div className="section-header">
          <h3 className="nepali-title">विवरण / PROFILE</h3>
        </div>

        <div className="profile-layout">
          <div className="profile-left-side">
            <img
              src="/8.png"
              alt="Profile"
              className="avatar-circle"
            />
            <div className="review-stars"><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></div>
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
        {/* section 3  */}
      </section>
      
                <section id="notif-section" className="main-section">
        <h3 className="nepali-title">सूचना <FontAwesomeIcon icon={faBell} /></h3>
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
    </div>
  );
};

export default ConsumerHome;