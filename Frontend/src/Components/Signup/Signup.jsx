import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  // Address Data
const locationData = {
    Kathmandu: ["Koteshwor", "Baneshwor", "Chabahil", "Kalanki"],
    Lalitpur: ["Patan", "Jawalakhel", "Lagankhel"],
    Bhaktapur: ["Suryabinayak", "Thimi", "Sallaghari"],
    Pokhara: ["Lakeside", "Mahendrapool"],
    Chitwan: ["Bharatpur", "Narayangarh"]
  };

  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    district: "",
    place: "",
    password: "",
    role: "user",
  });

  const [citizenshipPhoto, setCitizenshipPhoto] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    // Aligning keys with Backend Form arguments
    data.append("username", formData.username);
    data.append("mobilenumber", formData.mobile);
    
    data.append("address", `${formData.place}, ${formData.district}`);
    data.append("password", formData.password);
    data.append("role", formData.role);
    
    if (citizenshipPhoto) data.append("citizenship", citizenshipPhoto);
    if (userPhoto) data.append("coverphoto", userPhoto);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup/",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Signup Successful!");
        navigate("/login");
      }
    } catch (error) {
      alert(`Error: ${JSON.stringify(error.response?.data || "Server error")}`);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <img src="/logo.png" alt="SS Logo" className="logo" />
          <h2>Create Account</h2>
        </div>
        <br />
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* ROLE SELECTION */}
          <div className="form-group">
            <label id="role-label">SELECT ROLE</label>
            <div className="role-options">
              <label className={formData.role === "user" ? "active" : ""}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />
                user
              </label>
              <label className={formData.role === "consumer" ? "active" : ""}>
                <input
                  type="radio"
                  name="role"
                  value="consumer"
                  checked={formData.role === "consumer"}
                  onChange={handleChange}
                />
                consumer
              </label>
            </div>
          </div>

          {/*<div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>*/}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder=""
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/*<div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>*/}

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              placeholder=""
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
            {/* <div className="form-group">
            <label>Address</label>
            <input
              type="tel"
              name="mobile"
              placeholder=""
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>*/}

       <div className="form-group">
  <label>Address</label>
  
  {/* District Selection (Looks like an input box) */}
  <select 
    name="district" 
    value={formData.district} 
    onChange={handleChange} 
    required
    style={{ marginBottom: "10px" }}
  >
    <option value="">Select District</option>
    {Object.keys(locationData).map((d) => (
      <option key={d} value={d}>{d}</option>
    ))}
  </select>

  {/* Place Selection - District select bhayepachi matra automatic aaucha */}
  {formData.district && (
    <select 
      name="place" 
      value={formData.place} 
      onChange={handleChange} 
      required
    >
      <option value="">Select Place</option>
      {locationData[formData.district].map((p) => (
        <option key={p} value={p}>{p}</option>
      ))}
    </select>
  )}
</div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

      

          <div className="form-group">
            <label>Upload Citizenship Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCitizenshipPhoto(e.target.files[0])}
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Your Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setUserPhoto(e.target.files[0])}
              required
            />
          </div>

          <button className="signup-btn" type="submit">
            Create Account
          </button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>

        <div className="terms-condition">
          By continuing, you agree to UTA's
          <span> Terms of Use </span> and
          <span> Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;