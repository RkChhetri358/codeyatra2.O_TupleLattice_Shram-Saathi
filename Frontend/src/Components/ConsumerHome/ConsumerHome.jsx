import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; 
import axios from 'axios';
import './ConsumerHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faStar  } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import VoiceChat from '../VoiceChat/VoiceChat';
import { Link } from 'react-router-dom';

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
    basePrice: ""
  });
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    address: "",
    base_price: "",
    work_type: ""
  });
  const userId = localStorage.getItem("id") || localStorage.getItem("user_id");
  
  useEffect(() => {
  const fetchUserData = async () => {
    // If no userId, don't attempt to fetch
    if (!userId) {
      console.warn("No User ID found in localStorage");
      return;
    }

    try {
      console.log("Fetching data for User ID:", userId);
      const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
      
      // Log for debugging
      console.log("Backend Response:", response.data);

      setProfileData({
        name: response.data.username || "",
        phone: response.data.mobilenumber || "",
        address: response.data.address || "",
        // base_price: response.data.base_price || "",
        // work_type: response.data.work_type || ""
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  fetchUserData();
}, [userId]);

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
  data.append("base_price", formData.basePrice);
  
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
         
        </div>
<div className="work-grid-consumer">
  {myWorks.map((work) => (
    <div className="work-item-card-consumer" key={work.id}>
      <img 
        src={work.file_path ? `http://127.0.0.1:8000/${work.file_path}` : "/1.png"} 
        alt="project" 
        className="work-consumer" 
        onError={(e) => { e.target.src = "/1.png"; }}
      />
      <h4>{work.project_name}</h4>
      <p className="stats-orange">📍 {work.address}</p>
      
      {/* This will now work because navigate is defined above */}
      <button 
        className="btn-orange-consumer-pragati"
        onClick={() => navigate('/pragati', { state: { work: work } })}
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

                <input type="text" name="name" value={profileData.name} onChange={handleChange} placeholder="आफ्नो नाम लेख्नुहोस्" />

              </div>

                <div className="field-group">
                
                  <label>फोन नम्बर/Phone No.</label>
                
                  <input
                
                    type="text" name="phone" value={profileData.phone} onChange={handleChange}
                
                    placeholder="मोबाइल नम्बर प्रविष्ट गर्नुहोस्"
                
                  />
           


              </div>

              <div className="field-group">

                <label>ठेगाना/Address</label>

                <input type="text" name="address" value={profileData.address} onChange={handleChange} placeholder="आफ्नो ठेगाना लेख्नुहोस्" />

              </div>

         

            </div>

           

          </div>

        </div>

      </section>


       {/* SECTION 3: CHATBOT */}
         <section id="messages-section" className="messages-section main-section">

       <VoiceChat/>


        

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
                    <label>आधार मूल्य/Base Price </label>
                    <input name="basePrice" type="text" value={formData.basePrice} onChange={handleChange} required />
                  </div>
                  <div className="m-input full-span">
                    <label>अतिरिक्त जानकारी</label>
                    <textarea name="description" className="modal-textarea" value={formData.description} onChange={handleChange}></textarea>
                  </div>
                </div>
                <button type="submit" onClick={handleAddProject}  className="modal-submit-btn orange-btn-consumer">परियोजना थप्नुहोस्</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PROGRESS/UPDATE remains unchanged */}
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















    </div>
  );
};

export default ConsumerHome;