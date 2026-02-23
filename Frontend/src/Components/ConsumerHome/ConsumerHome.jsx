import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; 
import axios from 'axios';
import './ConsumerHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faStar,faBell   } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import VoiceChat from '../VoiceChat/VoiceChat';
import { Link } from 'react-router-dom';

const ConsumerHome = () => {
  const [myWorks, setMyWorks] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [showAddModal, setShowAddModal] = useState(false); 
  const [selectedWork, setSelectedWork] = useState(null);
  const [projectPhoto, setProjectPhoto] = useState(null);

  const [formData, setFormData] = useState({
    projectName: "",
    duration: "",
    requiredWorkers: "",
    address: "",
    projectType: "",
    description: "",
  });

  const workersData = [
    { id: 1, name: "Bishal Pokhrel", role: "निर्माण", img: "/8.png" },
    { id: 2, name: "Bishal Pokhrel", role: "निर्माण", img: "/8.png" },
    { id: 3, name: "Bishal Pokhrel", role: "निर्माण", img: "/8.png" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const storedUserId = localStorage.getItem("user_id");
    const phoneNumber = localStorage.getItem("phone_number") || "9800000000";

    if (!storedUserId) {
      alert("कृपया फेरि लगइन गर्नुहोस् (User ID not found)");
      return;
    }

    const data = new FormData();
    data.append("project_name", formData.projectName);
    data.append("duration", formData.duration);
    data.append("address", formData.address);
    data.append("project_type", formData.projectType);
    data.append("description", formData.description);
    data.append("consumer_id", parseInt(storedUserId));
    data.append("phone_number", phoneNumber);

    if (projectPhoto) {
      data.append("file", projectPhoto);
    } else {
      alert("कृपया एउटा फोटो छान्नुहोस्");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/postProjectDetails", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("परियोजना सफलतापूर्वक थपियो!");
        setShowAddModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error.response?.data);
      alert("Error adding project");
    }
  };

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
    <div className="home-wrapper-consumer">
      <Navbar />

      {/* SECTION 1: PROJECT GRID */}
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
                src={work.file_path ? `http://127.0.0.1:8000/${work.file_path}` : "/7.png"} 
                alt="work" className="work-consumer" 
              />
              <h4>{work.project_name}</h4>
              <p className="stats-orange">📍 {work.address}</p>
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

      {/* MODAL 1: ADD NEW PROJECT */}
      {showAddModal && (
        <div className="modal-overlay-consumer" onClick={() => setShowAddModal(false)}>
          <div className="modal-box-consumer wide-update-modal" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close orange-x" onClick={() => setShowAddModal(false)}>&times;</span>
            <h2 className="modal-title-top">नयाँ परियोजना</h2>
            
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
                  <input type="file" id="project-photo" style={{display: 'none'}} onChange={(e) => setProjectPhoto(e.target.files[0])} />
                </label>
                <p className="upload-text">फोटो थप्नुहोस्</p>
              </div>

              <div className="modal-right">
                <div className="modal-form-grid">
                  <div className="m-input">
                    <label>कामको नाम / शीर्षक</label>
                    <input name="projectName" type="text" onChange={handleChange} required />
                  </div>
                  <div className="m-input">
                    <label>समय अवधि</label>
                    <input name="duration" type="text" onChange={handleChange} required />
                  </div>
                  <div className="m-input">
                    <label>आवश्यक श्रमिक संख्या</label>
                    <input name="requiredWorkers" type="text" onChange={handleChange} required />
                  </div>
                  <div className="m-input">
                    <label>ठेगाना / Address</label>
                    <input name="address" type="text" onChange={handleChange} required />
                  </div>
                  <div className="m-input full-span">
                    <label>कामको प्रकार</label>
                    <input name="projectType" type="text" onChange={handleChange} required />
                  </div>
                </div>
                <button type="submit" className="modal-submit-btn orange-btn-consumer">परियोजना थप्नुहोस्</button>
              </div>
            </form>
          </div>
        </div>
      )}

     {/* MODAL 2: PROGRESS/DETAILS MODAL */}
      {showModal && (
        <div className="modal-overlay-consumer" onClick={() => setShowModal(false)}>
          <div className="modal-box-consumer wide-update-modal" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close orange-x" onClick={() => setShowModal(false)}>&times;</span>
            
            <h2 className="modal-title-top">{selectedWork?.project_name || selectedWork?.title}</h2>

            <div className="modal-top-section">
              <div className="modal-image-status">
                <img 
                  src={selectedWork?.file_path ? `http://127.0.0.1:8000/${selectedWork.file_path}` : (selectedWork?.img || "/7.png")} 
                  className="modal-job-img-large" 
                  alt="Job" 
                />
                <p className="status-label">Status : <span className="status-val">प्रक्रियामा</span></p>
              </div>

              <div className="modal-details-grid">
                <div className="m-input">
                  <label>कामको नाम / शीर्षक</label>
                  <input value={selectedWork?.project_name || selectedWork?.title || ""} readOnly />
                </div>
                <div className="m-input">
                  <label>समय अवधि</label>
                  <input value={selectedWork?.duration || ""} placeholder="उदा: २-५ वर्ष" readOnly />
                </div>
                <div className="m-input">
                  <label>फोन नम्बर/Phone No.</label>
                  <input value={selectedWork?.phone_number || ""} placeholder="मोबाइल नम्बर" readOnly />
                </div>
                <div className="m-input">
                  <label>ठेगाना/Address</label>
                  <input value={selectedWork?.address || ""} placeholder="आफ्नो ठेगाना" readOnly />
                </div>
                <div className="m-input">
                  <label>कामको प्रकार</label>
                  <input value={selectedWork?.project_type || ""} placeholder="निर्माण / घरकाम / कृषि" readOnly />
                </div>
                <div className="m-input">
                  <label>आवश्यक श्रमिक संख्या</label>
                  <input value={selectedWork?.required_workers || ""} placeholder="संख्या" readOnly />
                </div>
              </div>
            </div>

            {/* Added the center action button from your second version */}
            <div className="center-action" style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
              <button className="add-worker-btn-large" style={{ backgroundColor: "#ff6b00", color: "white", border: "none", padding: "10px 25px", borderRadius: "5px", cursor: "pointer" }}>
                श्रमिक थप्नुहोस्
              </button>
            </div>



            

            <div className="worker-list-area">
              <h3 className="section-subtitle">इच्छुक श्रमिक</h3>
              <div className="worker-row">
                {workersData.map((worker) => (
                  <div className="worker-card-mini" key={`interested-${worker.id}`}>
                    <img src={worker.img} alt="Worker" className="worker-thumb" />
                    <p className="worker-name">{worker.name}</p>
                    <p className="worker-role">{worker.role}</p>
                    <div className="worker-stars" style={{ color: "#ff6b00" }}>★★★★★</div>
                    <button className="select-btn-orange">छनौट</button>
                  </div>
                ))}
              </div>

              <h3 className="section-subtitle">स्वीकृत श्रमिक</h3>
              <div className="worker-row">
                {workersData.slice(0, 1).map((worker) => (
                  <div className="worker-card-mini" key={`confirmed-${worker.id}`}>
                    <img src={worker.img} alt="Worker" className="worker-thumb" />
                    <p className="worker-name">{worker.name}</p>
                    <p className="worker-role">{worker.role}</p>
                    <div className="worker-stars" style={{ color: "#ff6b00" }}>★★★★★</div>
                    <button className="select-btn-orange">विवरण</button>
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
            <button className="save-btn">परिवर्तन सुरक्षित गर्नुहोस्</button>
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


      <div>
       
      </div>
    </div>
  );
};

export default ConsumerHome;