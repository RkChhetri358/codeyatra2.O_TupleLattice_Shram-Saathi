import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faUser, faStar, faBell } from "@fortawesome/free-solid-svg-icons";
import VoiceChat from "../VoiceChat/VoiceChat";

const Home = () => {

  /* =========================
     STATE SECTION
  ========================== */

  const [jobs, setJobs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [negotiatedPrice, setNegotiatedPrice] = useState("");

  const [chatTarget, setChatTarget] = useState({ id: null, name: "" });

  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    address: "",
    base_price: "",
    work_type: "",
  });

  const userId =
    localStorage.getItem("id") || localStorage.getItem("user_id");

  /* =========================
     FETCH JOBS
  ========================== */

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/jobs"
        );
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Data can't load");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* =========================
     FETCH CONTACTS
  ========================== */

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/jobs"
        );

        const uniqueConsumers = Array.from(
          new Set(res.data.map((j) => j.owner_id))
        ).map((id) => res.data.find((j) => j.owner_id === id));

        setContacts(uniqueConsumers);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  /* =========================
     FETCH PROFILE
  ========================== */

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user/${userId}`
        );

        setProfileData({
          name: response.data.username || "",
          phone: response.data.mobilenumber || "",
          address: response.data.address || "",
          base_price: response.data.base_price || "",
          work_type: response.data.work_type || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchUserData();
  }, [userId]);

  /* =========================
     HANDLERS
  ========================== */

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setNegotiatedPrice(job.base_price || "");
    setShowModal(true);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      job_id: selectedJob.id,
      username: JSON.parse(localStorage.getItem("username")),
      duration: e.target.elements[1]?.value || "",
      phone: e.target.elements[2]?.value || "",
      address: e.target.elements[3]?.value || "",
      work_type: e.target.elements[4]?.value || "",
      additional_info: e.target.elements[6]?.value || "",
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/apply",
        applicationData
      );

      if (res.data.status === "success") {
        alert("आवेदन सफल भयो !");
        setShowModal(false);

        if (selectedJob.owner_id) {
          setChatTarget({
            id: selectedJob.owner_id,
            name: "Job Owner",
          });
        }
      }
    } catch (err) {
      console.error(err);
      alert("आवेदन असफल भयो ।");
    }
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = async () => {
    try {
      const updateData = {
        user_id: parseInt(userId),
        ...profileData,
      };

      await axios.post(
        "http://127.0.0.1:8000/api/profile/update",
        updateData
      );

      alert("जानकारी परिवर्तन सफल भयो !");
    } catch (err) {
      console.error(err);
      alert("अपडेट गर्न सकिएन ।");
    }
  };

  /* =========================
     JSX
  ========================== */

  return (
    <div className={`home-wrapper ${showModal ? "modal-active" : ""}`}>
      <Navbar />

      {/* HOME SECTION */}
      <section id="home-section" className="main-section">
        <div className="section-header">
          <h3 className="nepali-title">काम / Work</h3>
          <span className="filter-text">
            <FontAwesomeIcon icon={faFilter} /> Filter
          </span>
        </div>

        <div className="work-grid">
          {jobs.map((job) => (
            <div className="work-item-card" key={job.id}>
              <img src={job.img} alt="work" className="work-pic" />
              <h4>{job.title}</h4>
              <p>
                <FontAwesomeIcon icon={faUser} /> {job.count}
              </p>
              <button
                className="btn-orange"
                onClick={() => handleApplyClick(job)}
              >
                आवेदन
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PROFILE SECTION */}
      <section id="profile-section" className="main-section">
        <h3>PROFILE</h3>

        <input
          type="text"
          name="base_price"
          value={profileData.base_price}
          onChange={handleChange}
          placeholder="Base Price"
        />

        <input
          type="text"
          name="work_type"
          value={profileData.work_type}
          onChange={handleChange}
          placeholder="Work Type"
        />

        <button onClick={handleProfileUpdate}>
          जानकारी परिवर्तन
        </button>
      </section>

      {/* CHAT SECTION */}
      <section id="notif-section" className="main-section">
        <h3>
          Messages <FontAwesomeIcon icon={faBell} />
        </h3>

        <div style={{ display: "flex", height: "500px" }}>
          <div style={{ width: "30%", borderRight: "1px solid #ddd" }}>
            {contacts.map((contact) => (
              <div
                key={contact.owner_id}
                onClick={() =>
                  setChatTarget({
                    id: contact.owner_id,
                    name: contact.title,
                  })
                }
              >
                {contact.title}
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }}>
            {chatTarget.id ? (
              <VoiceChat
                currentUserId={userId}
                targetUserId={chatTarget.id}
                targetUserName={chatTarget.name}
              />
            ) : (
              <p>Select a contact</p>
            )}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <form onSubmit={handleFinalSubmit}>
              <input
                type="text"
                value={negotiatedPrice}
                onChange={(e) =>
                  setNegotiatedPrice(e.target.value)
                }
                required
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;