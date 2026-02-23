import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./ConsumerHome.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFilter ,faUser,faStar,faBell} from '@fortawesome/free-solid-svg-icons';

const ConsumerHome = () => {
  const [myWorks, setMyWorks] = useState([]); // <-- must exist
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    const fetchMyWorks = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/consumer/works",
        );
        setMyWorks(response.data);
      } catch (err) {
        setMyWorks([
          {
            id: 1,
            title: "भवन निर्माण (Build House)",
            count: "23 / 30",
            img: "/7.png",
          },
          {
            id: 2,
            title: "घरकाम (Clean House)",
            count: "0 / 1",
            img: "/2.png",
          },
          {
            id: 3,
            title: "घरकाम (Clean House)",
            count: "2 / 2",
            img: "/3.png",
          },
        ]);
      }
    };
    fetchMyWorks();
  }, []);

  return (
    <div className="home-wrapper-consumer">
      <Navbar />

      {/* SECTION 1: HOME */}
      <section className="main-section-consumer" id="home-section">
        <div
          className="top-action"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          {/* TRIGGER FOR NEW PROJECT MODAL */}
          <button
            className="btn-orange-consumer"
            style={{ padding: "14px 40px" }}
            onClick={() => setShowAddModal(true)}
          >
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
              <p className="stats-orange"><FontAwesomeIcon icon={faUser} />{work.count}</p>
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
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box add-project-modal">
            <span
              className="modal-close orange-x"
              onClick={() => setShowAddModal(false)}
            >
              &times;
            </span>

            <h2 className="nepali-title main-modal-title">नयाँ परियोजना</h2>

            <form className="modal-flex">
              {/* Left Side: Photo Upload */}
              <div className="modal-left photo-upload-section">
                <div className="photo-placeholder">
                  <span className="plus-icon">+</span>
                </div>
                <p className="upload-text">फोटो थप्नुहोस्</p>
              </div>

              {/* Right Side: Form Fields */}
              <div className="modal-right">
                <div className="modal-form-grid">
                  <div className="m-input">
                    <label>कामको नाम / शीर्षक</label>
                    <input
                      type="text"
                      placeholder="परियोजनाको नाम लेख्नुहोस्"
                    />
                  </div>
                  <div className="m-input">
                    <label>समय अवधि</label>
                    <input type="text" placeholder="समय अवधि" />
                  </div>
                  <div className="m-input">
                    <label>आवश्यक श्रमिक संख्या</label>
                    <input type="text" placeholder="संख्या लेख्नुहोस्" />
                  </div>
                  <div className="m-input">
                    <label>ठेगाना / Address</label>
                    <input type="text" placeholder="आफ्नो ठेगाना लेख्नुहोस्" />
                  </div>
                  <div className="m-input full-span">
                    <label>कामको प्रकार</label>
                    <input
                      type="text"
                      placeholder="निर्माण / घरकाम / कृषि / अन्य"
                    />
                  </div>
                  <div className="m-input full-span">
                    <label>अतिरिक्त जानकारी</label>
                    <textarea
                      className="modal-textarea"
                      placeholder="विवरण लेख्नुहोस्..."
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="modal-submit-btn orange-btn-consumer"
                >
                  आवेदन
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PROGRESS/UPDATE */}
      {showModal && (
        <div
          className="modal-overlay-consumer"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-box-consumer"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="modal-close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2 className="modal-title">{selectedWork?.title}</h2>
            <div className="modal-flex">
              <div className="modal-left">
                <img src={selectedWork?.img} className="modal-job-img" alt="" />
              </div>
              <div className="modal-right">
                <div className="modal-form-grid">
                  <div className="m-input">
                    <label>कामको शीर्षक</label>
                    <input value={selectedWork?.title} readOnly />
                  </div>
                  <div className="m-input purple-border">
                    <label>समय अवधि</label>
                    <input placeholder="2-5 years" />
                  </div>
                  <div className="m-input">
                    <label>सम्पर्क नम्बर</label>
                    <input placeholder="98XXXXXXXX" />
                  </div>
                  <div className="m-input">
                    <label>ठेगाना</label>
                    <input placeholder="काठमाडौं" />
                  </div>
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
