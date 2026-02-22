import React, { useState, useEffect } from "react";
import "./Loginpage.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate('/layout/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        const userData = {
          username: response.data.username,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        navigate('/layout/dashboard');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Invalid username or password");
      } else {
        setError("Cannot connect to server. Please try again.");
      }
    }
  };

  const socialLogin = (provider) => {
    const urls = {
      google: "https://accounts.google.com/o/oauth2/v2/auth",
      facebook: "https://www.facebook.com/v18.0/dialog/oauth",
      discord: "https://discord.com/oauth2/authorize"
    };
    window.location.href = urls[provider];
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/logo.png" alt="UTA Logo" className="logo" />
          <h2>Welcome Back</h2>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="error-msg">{error}</p>}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div className="forgot-password">Forgot Password?</div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-login">
          <button className="social-btn" onClick={() => socialLogin('google')}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" height="20" />
          </button>
          <button className="social-btn" onClick={() => socialLogin('facebook')}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" height="20" />
          </button>
          <button className="social-btn" onClick={() => socialLogin('discord')}>
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png" alt="Discord" height="20" />
          </button>
        </div>

        <div className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
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

export default Login;