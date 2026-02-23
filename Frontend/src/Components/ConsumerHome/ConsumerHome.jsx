import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; 
import axios from 'axios';
import './ConsumerHome.css';

const ConsumerHome = () => {
<<<<<<< HEAD
  const [myWorks, setMyWorks] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [showAddModal, setShowAddModal] = useState(false); 
=======
  const [myWorks, setMyWorks] = useState([]); // <-- must exist
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
>>>>>>> 49f8ea5b872cb8992f08156c9d42d33e17e6d649
  const [selectedWork, setSelectedWork] = useState(null);
  

<<<<<<< HEAD

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
=======
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
>>>>>>> 49f8ea5b872cb8992f08156c9d42d33e17e6d649

  return (
    <div className="home-wrapper-consumer">
      <Navbar />

<<<<<<< HEAD
      <section className="main-section" id="home-section">
        <div className="top-action" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <button className="btn-orange" style={{ padding: '14px 40px' }} onClick={() => setShowAddModal(true)}>
=======
      {/* SECTION 1: HOME */}
      <section className="main-section-consumer" id="home-section">
        <div className="top-action" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          {/* TRIGGER FOR NEW PROJECT MODAL */}
          <button className="btn-orange-consumer" style={{ padding: '14px 40px' }} onClick={() => setShowAddModal(true)}>
>>>>>>> 49f8ea5b872cb8992f08156c9d42d33e17e6d649
            नयाँ परियोजना थप्नुहोस्
          </button>
        </div>

        <div className="section-header">
          <h3 className="nepali-title">मेरो काम / My work</h3>
          <span className="filter-text">सबै हेर्नुहोस्</span>
        </div>

        <div className="work-grid-consumer">
          {myWorks.map((work) => (
<<<<<<< HEAD
            <div className="work-item-card" key={work.id}>
              <img src={work.img || "/1.png"} alt="work" className="work-consumer" />
              <h4>{work.project_name || work.title}</h4>
              <p className="stats-orange">👤 {work.requiredWorkers || work.count}</p>
=======
            <div className="work-item-card-consumer" key={work.id}>
              <img src={work.img} alt="work" className="work-consumer" />
              <h4>{work.title}</h4>
              <p className="stats-orange">👤 {work.count}</p>
>>>>>>> 49f8ea5b872cb8992f08156c9d42d33e17e6d649
              <p className="sub-desc">निर्माण मजदुरको लागि अवसर</p>
              <button className="btn-orange-consumer-pragati" onClick={() => { setSelectedWork(work); setShowModal(true); }}>प्रगति</button>
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
<<<<<<< HEAD
                <button type="submit" onClick={handleAddProject} className="modal-submit-btn orange-btn">आवेदन</button>
=======
                <button type="submit" className="modal-submit-btn orange-btn-consumer">आवेदन</button>
>>>>>>> 49f8ea5b872cb8992f08156c9d42d33e17e6d649
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PROGRESS/UPDATE remains unchanged */}
      {showModal && (
<<<<<<< HEAD
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
           {/* ... progress modal code ... */}
=======
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
>>>>>>> 49f8ea5b872cb8992f08156c9d42d33e17e6d649
        </div>
      )}
    </div>
  );
};

export default ConsumerHome;