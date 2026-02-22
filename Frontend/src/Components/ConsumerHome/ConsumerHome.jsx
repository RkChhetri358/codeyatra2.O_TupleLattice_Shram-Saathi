import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; 
import axios from 'axios';
import './ConsumerHome.css';

const ConsumerHome = () => {
  const [myWorks, setMyWorks] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [showAddModal, setShowAddModal] = useState(false); 
  const [selectedWork, setSelectedWork] = useState(null);
  


  const [formData, setFormData] = useState({
    projectName: "",
    duration: "",
    requiredWorkers: "",
    address: "",
    projectType: "",
    description: "",
  });

  const [projectPhoto, setProjectPhoto] = useState(null);

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setProjectPhoto(e.target.files[0]);
  };

const handleAddProject = async (e) => {
  e.preventDefault();

  // 1. Get data from localStorage
  const storedUserId = localStorage.getItem("user_id");


  const phoneNumber = localStorage.getItem("phone_number")|| "9800000000";

  // 2. Validation: Don't send if ID is missing
  if (!storedUserId) {
    alert("कृपया फेरि लगइन गर्नुहोस् (User ID not found)");
    return;
  }

  const data = new FormData();
  data.append("project_name", formData.projectName);
  data.append("duration", formData.duration);
  // data.append("phone_number", storedPhone); 
  data.append("address", formData.address);
  data.append("project_type", formData.projectType);
  data.append("description", formData.description);
  
  // Ensure this is sent as a clean number string
  data.append("consumer_id", parseInt(storedUserId)); 
  data.append("phone_number", phoneNumber);
  
  if (projectPhoto) {
    data.append("file", projectPhoto);
  } else {
    alert("कृपया एउटा फोटो छान्नुहोस् (Please select a photo)");
    return;
  }

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/postProjectDetails", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200) {
      alert("परियोजना सफलतापूर्वक थपियो!");
      setShowAddModal(false);
      setFormData({
        projectName: "", duration: "", requiredWorkers: "",
        address: "", projectType: "", description: ""
      });
      setProjectPhoto(null);
      // Refresh the list
      window.location.reload(); 
    }
  } catch (error) {
    // This will help you see EXACTLY why the 422 happened in the console
    console.error("Validation Error Details:", error.response?.data);
    alert("Error: " + JSON.stringify(error.response?.data?.detail || "Server error"));
  }
};

  // useEffect(() => {
  //   const fetchMyWorks = async () => {
  //     try {
  //       const response = await axios.get("http://127.0.0.1:8000/api/allprojects");
  //       setMyWorks(response.data);
  //     } catch (err) {
  //       // Fallback dummy data if backend fails
  //       setMyWorks([
  //         { id: 1, title: 'भवन निर्माण (Build House)', count: '23 / 30', img: '/1.png' },
  //         { id: 2, title: 'घरकाम (Clean House)', count: '0 / 1', img: '/2.png' },
  //         { id: 3, title: 'घरकाम (Clean House)', count: '2 / 2', img: '/3.png' },
  //       ]);
  //     }
  //   };
  //   fetchMyWorks();
  // }, []);

  return (
    <div className={`home-wrapper ${(showModal || showAddModal) ? 'modal-active' : ''}`}>
      <Navbar />

      <section className="main-section" id="home-section">
        <div className="top-action" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <button className="btn-orange" style={{ padding: '14px 40px' }} onClick={() => setShowAddModal(true)}>
            नयाँ परियोजना थप्नुहोस्
          </button>
        </div>

        <div className="section-header">
          <h3 className="nepali-title">मेरो काम / My work</h3>
          <span className="filter-text">सबै हेर्नुहोस्</span>
        </div>

        <div className="work-grid">
          {myWorks.map((work) => (
            <div className="work-item-card" key={work.id}>
              <img src={work.img || "/1.png"} alt="work" className="work-consumer" />
              <h4>{work.project_name || work.title}</h4>
              <p className="stats-orange">👤 {work.requiredWorkers || work.count}</p>
              <p className="sub-desc">निर्माण मजदुरको लागि अवसर</p>
              <button className="btn-orange" onClick={() => { setSelectedWork(work); setShowModal(true); }}>प्रगति</button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: PROFILE remains unchanged */}
      <section className="main-section profile-light-bg" id="profile-section">
        {/* ... profile code ... */}
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
                  <div className="photo-placeholder">
                    {projectPhoto ? (
                      <img src={URL.createObjectURL(projectPhoto)} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    ) : (
                      <span className="plus-icon">+</span>
                    )}
                  </div>
                  <input 
                    type="file" 
                    id="project-photo" 
                    style={{display: 'none'}} 
                    onChange={(e) => setProjectPhoto(e.target.files[0])} 
                  />
                </label>
                <p className="upload-text">फोटो थप्नुहोस्</p>
              </div>

              <div className="modal-right">
                <div className="modal-form-grid">
                  <div className="m-input">
                    <label>कामको नाम / शीर्षक</label>
                    <input name="projectName" type="text" value={formData.projectName} onChange={handleChange} required />
                  </div>
                  <div className="m-input">
                    <label>समय अवधि</label>
                    <input name="duration" type="text" value={formData.duration} onChange={handleChange} required />
                  </div>
                  <div className="m-input">
                    <label>आवश्यक श्रमिक संख्या</label>
                    <input name="requiredWorkers" type="text" value={formData.requiredWorkers} onChange={handleChange} required />
                  </div>
                  <div className="m-input">
                    <label>ठेगाना / Address</label>
                    <input name="address" type="text" value={formData.address} onChange={handleChange} required />
                  </div>
                  <div className="m-input full-span">
                    <label>कामको प्रकार</label>
                    <input name="projectType" type="text" value={formData.projectType} onChange={handleChange} required />
                  </div>
                  <div className="m-input full-span">
                    <label>अतिरिक्त जानकारी</label>
                    <textarea name="description" className="modal-textarea" value={formData.description} onChange={handleChange}></textarea>
                  </div>
                </div>
                <button type="submit" onClick={handleAddProject} className="modal-submit-btn orange-btn">आवेदन</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PROGRESS/UPDATE remains unchanged */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
           {/* ... progress modal code ... */}
        </div>
      )}
    </div>
  );
};

export default ConsumerHome;