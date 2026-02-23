import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; 
import axios from 'axios';
import './ConsumerHome.css';

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

  // Handle Input Changes for the Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Adding New Project
  const handleAddProject = (e) => {
    e.preventDefault();
    console.log("New Project Data:", formData);
    setShowAddModal(false);
    alert("नयाँ परियोजना सफलतापूर्वक थपियो!");
  };

  useEffect(() => {
    const fetchMyWorks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/consumer/works");
        setMyWorks(response.data);
      } catch (err) {
        setMyWorks([
          { id: 1, title: 'भवन निर्माण (Build House)', count: '23 / 30', img: '/7.png' },
          { id: 2, title: 'घरकाम (Clean House)', count: '0 / 1', img: '/2.png' },
          { id: 3, title: 'घरकाम (Clean House)', count: '2 / 2', img: '/3.png' },
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
        <div className="top-action" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <button className="btn-orange-consumer" style={{ padding: '14px 40px' }} onClick={() => setShowAddModal(true)}>
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
              <p className="stats-orange">👤 {work.count}</p>
              <p className="sub-desc">निर्माण मजदुरको लागि अवसर</p>
              <button className="btn-orange-consumer-pragati" onClick={() => { setSelectedWork(work); setShowModal(true); }}>प्रगति</button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: PROFILE */}
      <section className="main-section profile-light-bg" id="profile-section" style={{ minHeight: '100vh', padding: '100px 10%' }}>
        <h3 className="nepali-title">विवरण / PROFILE</h3>
        <div className="profile-layout" style={{ display: 'flex', gap: '50px', marginTop: '30px' }}>
          <div className="profile-left-side">
            <img src="/user_profile.png" alt="Profile" className="avatar-circle" style={{ width: '200px', borderRadius: '50%' }} />
          </div>
          <div className="profile-details-form" style={{ flex: 1 }}>
            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="field-group"><label>नाम/Name</label><input type="text" placeholder="आफ्नो नाम" /></div>
              <div className="field-group"><label>फोन नम्बर</label><input type="text" placeholder="98XXXXXXXX" /></div>
              <div className="field-group" style={{ gridColumn: 'span 2' }}><label>ठेगाना</label><input type="text" placeholder="ठेगाना" /></div>
            </div>
            <button className="save-btn" style={{ marginTop: '20px', padding: '10px 30px', background: '#f18f14', color: '#fff', border: 'none', borderRadius: '25px' }}>परिवर्तन सुरक्षित गर्नुहोस्</button>
          </div>
        </div>
      </section>

      {/* MODAL 1: ADD NEW PROJECT */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box add-project-modal">
            <span className="modal-close orange-x" onClick={() => setShowAddModal(false)}>&times;</span>
            <h2 className="nepali-title main-modal-title">नयाँ परियोजना</h2>
            
            <form className="modal-flex" onSubmit={handleAddProject}>
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

              <div className="modal-right" style={{ flex: 1 }}>
                <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="m-input"><label>कामको शीर्षक</label><input name="projectName" type="text" onChange={handleChange} required /></div>
                  <div className="m-input"><label>समय अवधि</label><input name="duration" type="text" onChange={handleChange} required /></div>
                  <div className="m-input"><label>श्रमिक संख्या</label><input name="requiredWorkers" type="text" onChange={handleChange} required /></div>
                  <div className="m-input"><label>ठेगाना</label><input name="address" type="text" onChange={handleChange} required /></div>
                  <div className="m-input" style={{ gridColumn: 'span 2' }}><label>विवरण</label><textarea name="description" style={{ width: '100%', height: '60px' }} onChange={handleChange}></textarea></div>
                </div>
                <button type="submit" className="modal-submit-btn orange-btn-consumer" style={{ width: '100%', marginTop: '20px' }}>सुरक्षित गर्नुहोस्</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PROGRESS/UPDATE */}
      {showModal && (
        <div className="modal-overlay-consumer" onClick={() => setShowModal(false)}>
          <div className="modal-box-consumer" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 className="modal-title">{selectedWork?.title}</h2>
            <div className="modal-flex">
              <div className="modal-left">
                <img src={selectedWork?.img} className="modal-job-img" alt="" style={{ width: '150px', borderRadius: '15px' }} />
              </div>
              <div className="modal-right" style={{ flex: 1, paddingLeft: '20px' }}>
                <div className="modal-form-grid">
                  <div className="m-input"><label>कामको शीर्षक</label><input value={selectedWork?.title} readOnly /></div>
                  <div className="m-input"><label>समय अवधि</label><input placeholder="2-5 years" /></div>
                </div>
                <button className="modal-submit-btn" style={{ marginTop: '20px' }}>अपडेट गर्नुहोस्</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerHome;