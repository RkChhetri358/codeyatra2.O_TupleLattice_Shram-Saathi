import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; 
import axios from 'axios';
import './ConsumerHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faStar,faBell   } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import VoiceChat from '../VoiceChat/VoiceChat';
import { Link } from 'react-router-dom';
import Toggle from '../Toggle/Toggle';

const ConsumerHome = () => {
  const [myWorks, setMyWorks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  
  // Form State for New Project Modal
  const [projectPhoto, setProjectPhoto] = useState(null);
  const [formData, setFormData] = useState({
    projectName: '',
    duration: '',
    requiredWorkers: '',
    address: '',
    projectType: '',
    description: ''
  });

  useEffect(() => {
    const fetchMyWorks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/allprojects");
        setMyWorks(response.data);
      } catch (err) {
        setMyWorks([
          { id: 1, project_name: "भवन निर्माण", address: "Kathmandu", duration: "1 Year", file_path: "" },
        ]);
      }
    };
    fetchMyWorks();
  }, []);

  return (
    <div className={`home-wrapper-consumer ${showModal || showAddModal ? 'modal-active' : ''}`}>
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
         
        </div>


        <div className="work-grid-consumer">
          {myWorks.map((work) => (
            <div className="work-item-card-consumer" key={work.id}>
              <img src={work.img} alt="work" className="work-consumer" />
              <h4>{work.title}</h4>
              <p className="stats-orange">👤 {work.count}</p>
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
            <img src="/8.png" alt="Profile" className="avatar-circle" />
            <div className="review-stars">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
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
            <button className="save-btn" style={{ marginTop: '20px', padding: '10px 30px', background: '#f18f14', color: '#fff', border: 'none', borderRadius: '25px' }}>परिवर्तन सुरक्षित गर्नुहोस्</button>
          </div>
        </div>
      </section>

      {/* SECTION 3: NOTIFICATIONS */}
      <section id="notif-section" className="main-section">
        <h3 className="nepali-title">Message <FontAwesomeIcon icon={faBell} /></h3>
        <div className="notif-container">
           <VoiceChat/>
        </div>
      </section>


            <form className="modal-flex">
              {/* Left Side: Photo Upload */}
              <div className="modal-left photo-upload-section">
                <label htmlFor="project-photo" style={{ cursor: 'pointer' }}>
                  <div className="photo-placeholder" style={{ width: '150px', height: '150px', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {projectPhoto ? (
                      <img src={URL.createObjectURL(projectPhoto)} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    ) : (
                      <span className="plus-icon" style={{ fontSize: '40px', color: '#ccc' }}>+</span>
                    )}
                  </div>
                  <input type="file" id="project-photo" style={{display: 'none'}} onChange={(e) => setProjectPhoto(e.target.files[0])} />
                </label>
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
                <img src={selectedWork?.img} className="modal-job-img" alt="" style={{ width: '150px', borderRadius: '15px' }} />
              </div>
              <div className="modal-right" style={{ flex: 1, paddingLeft: '20px' }}>
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
                <button className="modal-submit-btn" style={{ marginTop: '20px' }}>अपडेट गर्नुहोस्</button>
              </div>
            </div>
          </div>
        </div>
        
      )}

export default ConsumerHome;