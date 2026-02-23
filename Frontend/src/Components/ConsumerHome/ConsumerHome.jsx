import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; 
import axios from 'axios';
import './ConsumerHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faStar  } from '@fortawesome/free-solid-svg-icons'

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

useEffect(() => {
  const fetchMyWorks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/allprojects");
      console.log("Data Received from Backend:", response.data); // DEBUG 2
      setMyWorks(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      // Fallback dummy data if backend is empty/fails
      setMyWorks([
        { id: 1, project_name: 'भवन निर्माण', duration: '1 Year', address: 'Kathmandu', file_path: '' },
      ]);
    }
  };
  fetchMyWorks();
}, []);




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
    <div className="home-wrapper-consumer">
      <Navbar />

      {/* SECTION 1: HOME */}
      <section className="main-section-consumer" id="home-section">
        <div className="top-action" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          {/* TRIGGER FOR NEW PROJECT MODAL */}
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
      {/* 1. Display the uploaded image or a default one */}
     
      <img 
        src={work.file_path ? `http://127.0.0.1:8000/${work.file_path}` : "/1.png"} 
        alt="project" 
        className="work-consumer" 
        onError={(e) => { e.target.src = "/1.png"; }} // Fallback if image path fails
      />
      
      {/* 2. Display project name */}
      <h4>{work.project_name}</h4>
      
      {/* 3. Display Type and Address */}
      <p className="stats-orange">📍 {work.address}</p>
      <p className="sub-desc">{work.project_type || "निर्माण मजदुरको लागि अवसर"}</p>
      
      {/* 4. Display Duration */}
      <p style={{ fontSize: '12px', color: '#666' }}>अवधि: {work.duration}</p>
      
      <button 
        className="btn-orange-consumer-pragati" 
        onClick={() => { setSelectedWork(work); setShowModal(true); }}
      >
        विवरण हेर्नुहोस्
      </button>
    </div>
  ))}
</div>


    

        
      </section>

      {/* SECTION 2: PROFILE remains unchanged */}
         <section id="profile-section" className="main-section profile-light-bg">

        <div className="profile-top-bar">

          <h3 className="nepali-title">विवरण / PROFILE</h3>

          <span className="availability">उपलब्धता / Status : उपलब्ध 🟢</span>

        </div>



        <div className="profile-layout">

          <div className="profile-sidebar">

       

            <img src="/7.png" alt="User" className="profile-avatar-img" />



            <div className="review-stars">

              <p>समीक्षा / Review</p>

              <div className="star-row"><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /> 5.0</div>

            </div>

          </div>



          <div className="profile-details-form">

            <div className="form-grid">

              <div className="field-group">

                <label>नाम/Name</label>

                <input type="text" placeholder="आफ्नो नाम लेख्नुहोस्" />

              </div>

              <div className="field-group">

                <label>आधार मूल्य/Base Price</label>

                <input

                  type="text"

                  placeholder="आधार मूल्य प्रविष्ट गर्नुहोस्"

                />

              </div>

              <div className="field-group">

                <label>फोन नम्बर/Phone No.</label>

                <input

                  type="text"

                  placeholder="मोबाइल नम्बर प्रविष्ट गर्नुहोस्"

                />

              </div>

              <div className="field-group">

                <label>ठेगाना/Address</label>

                <input type="text" placeholder="आफ्नो ठेगाना लेख्नुहोस्" />

              </div>

              <div className="field-group full-span">

                <label>कामको प्रकार</label>

                <input

                  type="text"

                  placeholder="निर्माण / घरकाम / कृषि / अन्य"

                />

              </div>

            </div>

            <button className="save-btn">जानकारी परिवर्तन</button>

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
                <button type="submit" onClick={handleAddProject}  className="modal-submit-btn orange-btn-consumer">आवेदन</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PROGRESS/UPDATE remains unchanged */}
      {showModal && (
        <div className="modal-overlay-consumer" onClick={() => setShowModal(false)}>
          <div className="modal-box-consumer" onClick={(e) => e.stopPropagation()}>
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