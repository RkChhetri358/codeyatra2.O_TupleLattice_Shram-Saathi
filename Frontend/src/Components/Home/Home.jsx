import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; 
import axios from 'axios'; 
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter ,faUser,faStar} from '@fortawesome/free-solid-svg-icons';
const Home = () => {
  
  const [jobs, setJobs] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        
        const response = await axios.get("http://127.0.0.1:8000/api/jobs");
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("data cant be load");
        setLoading(false);
        
        
        setJobs([
          { id: 1, title: 'भवन निर्माण (Build House)', count: '23 / 30', img: '/1.png' },
          { id: 2, title: 'घरकाम (Clean House)', count: '0 / 1', img: '/2.png' },
          { id: 3, title: 'घरकाम (Clean House)', count: '2 / 2', img: '/3.png' },
        ]);
      }
    };

    fetchJobs();
  }, []);

  // 2. आवेदन thichda hune kaam
  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };





  const handleFinalSubmit = async (e) => {
  e.preventDefault();
  // Get values from form inputs (you'll need to add state for these inputs)
  const applicationData = {
    job_id: selectedJob.id,
    username: JSON.parse(localStorage.getItem("username")), 
    duration: e.target[1].value, // Simple way to get input values
    phone: e.target[2].value,
    address: e.target[3].value,
    work_type: e.target[4].value,
    additional_info: e.target[5].value
  };

  try {
    await axios.post("http://127.0.0.1:8000/api/apply", applicationData);
    alert("आवेदन सफल भयो !");
    setShowModal(false);
  } catch (err) {
    alert("त्रुटि भयो ।");
  }
};

const [profileData, setProfileData] = useState({
  name: "",
  phone: "",
  address: "",
  base_price: "",
  work_type: ""
});
const userId = localStorage.getItem("id") || localStorage.getItem("user_id");

  // 1. Fetch User Data on Load
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

  // 2. Handle input changes
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // 3. Update Profile Logic
  const handleProfileUpdate = async () => {
    try {
      const updateData = {
        user_id: parseInt(userId),
        name: profileData.name,
        phone: profileData.phone,
        address: profileData.address,
        base_price: profileData.base_price,
        work_type: profileData.work_type
      };

      // Changed to .post as per your backend route definition
      const response = await axios.post("http://127.0.0.1:8000/api/profile/update", updateData);
      
      if (response.status === 200) {
        alert("जानकारी परिवर्तन सफल भयो ! (Profile Updated)");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("अपडेट गर्न सकिएन ।");
    }
  };

  return (
    <div className={`home-wrapper ${showModal ? 'modal-active' : ''}`}>
      <Navbar />

      {/* SECTION 1: HOME */}
      <section id="home-section" className="main-section">
        <div className="section-header">
          <h3 className="nepali-title">काम / Work</h3>
          <span className="filter-text"><FontAwesomeIcon icon={faFilter} /> छनोट / Filter</span>
        </div>

        <div className="work-grid">
          {jobs.map((job) => (
            <div className="work-item-card" key={job.id}>
              <img src={job.img} alt="work" className="work-pic" />
              <h4>{job.title}</h4>
              <p className="stats-orange"><FontAwesomeIcon icon={faUser} />{job.count}</p>
              <p className="sub-desc">घरवान / निर्माण मजदुरको लागि अवसर</p>
              <button className="btn-orange" onClick={()=>handleApplyClick(job)}>आवेदन</button>
            </div>
          ))}
        </div>

        <h3 className="nepali-title" style={{ marginTop: "60px" }}>
          अधिकतम पारिश्रमिक
        </h3>
        <div className="work-grid">
          {jobs.map((job) => (
            <div className="work-item-card" key={`wage-${job.id}`}>
              <img src={job.img} alt="work" className="work-pic" />
              <h4>{job.title}</h4>
              <p className="stats-orange"><FontAwesomeIcon icon={faUser} />{job.count}</p>
              <p className="sub-desc">घरवान / निर्माण मजदुरको लागि अवसर</p>
              <button className="btn-orange" onClick={() => handleApplyClick(job)}>आवेदन</button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: PROFILE */}
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
            <div className="star-row">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} /> 5.0
            </div>
          </div>
        </div>

        <div className="profile-details-form">
          <div className="form-grid">
            <div className="field-group">
              <label>नाम/Name</label>
              <input 
                type="text" 
                name="name"
                value={profileData.name} 
                readOnly // Fetched, not editable
                className="readonly-input"
              />
            </div>
            <div className="field-group">
              <label>आधार मूल्य/Base Price</label>
              <input
                type="text"
                name="base_price"
                placeholder="आधार मूल्य प्रविष्ट गर्नुहोस्"
                value={profileData.base_price}
                onChange={handleChange} // Editable
              />
            </div>
            <div className="field-group">
              <label>फोन नम्बर/Phone No.</label>
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                readOnly // Fetched, not editable
              />
            </div>
            <div className="field-group">
              <label>ठेगाना/Address</label>
              <input 
                type="text" 
                name="address"
                value={profileData.address} 
                readOnly // Fetched, not editable
              />
            </div>
            <div className="field-group full-span">
              <label>कामको प्रकार</label>
              <input
                type="text"
                name="work_type"
                placeholder="निर्माण / घरकाम / कृषि / अन्य"
                value={profileData.work_type}
                onChange={handleChange} // Editable
              />
            </div>
          </div>
          <button className="save-btn" onClick={handleProfileUpdate}>
            जानकारी परिवर्तन
          </button>
        </div>
      </div>
    </section>

      {/* SECTION 3: NOTIFICATIONS */}
      <section id="notif-section" className="main-section">
        <h3 className="nepali-title">सूचना 🔔</h3>
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

      {/* POPUP MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 className="modal-title">{selectedJob?.title}</h2>
            
            <form onSubmit={handleFinalSubmit} className="modal-flex">
              <div className="modal-left">
                <img src={selectedJob?.img} alt="job" className="modal-job-img" />
              </div>
              <div className="modal-right">
                <div className="modal-form-grid">
                  <div className="m-input">
                    <label>कामको नाम / Task name</label>
                    <input type="text" value={selectedJob?.title} readOnly />
                  </div>
                  <div className="m-input purple-border">
                    <label>समय अवधि/ Time Duration</label>
                    <input type="text" placeholder="2-5 years" required />
                  </div>
                  <div className="m-input">
                    <label>फोन नम्बर/Phone No.</label>
                    <input type="text" placeholder="मोबाइल नम्बर" required />
                  </div>
                  <div className="m-input">
                    <label>ठेगाना/Address</label>
                    <input type="text" placeholder="ठेगाना" required />
                  </div>
                  <div className="m-input">
                    <label>कामको प्रकार/Work Type</label>
                    <input type="text" placeholder="Work type" required />
                  </div>
                  <div className="m-input">
                    <label>अतिरिक्त जानकारी/Additional info</label>
                    <textarea placeholder="..."></textarea>
                  </div>
                </div>
                <button type="submit" className="modal-submit-btn">आवेदन</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <img src="/side.png" alt="" className="floating-bg" />
    </div>
  );
};

export default Home;
