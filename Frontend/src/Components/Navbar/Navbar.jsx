import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home-section");

 
  useEffect(() => {
    const sections = document.querySelectorAll("section, main");
    const options = {
      root: null,
      threshold: 0.6, // 60% section screen ma aayesi active hune
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Click garera scroll garne function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar-container">
      <div className="navleft">
        <div className="nav-logo">
          <img 
            src="/logo.png" 
            alt="Logo" 
            onClick={handleLogoClick} 
            style={{ cursor: 'pointer' }} 
          />
        </div>
      </div>

      <div className="navcenter">
        <ul className="navbar-menu">
          <li 
            className={activeSection === "home-section" ? "active" : ""} 
            onClick={() => scrollToSection('home-section')}
          >
            HOME
          </li>
          <li 
            className={activeSection === "profile-section" ? "active" : ""} 
            onClick={() => scrollToSection('profile-section')}
          >
            PROFILE
          </li>
          <li 
            className={activeSection === "messages-section" ? "active" : ""} 
            onClick={() => scrollToSection('messages-section')}
          > 
          
            MESSAGES

            
          </li>
          {/* <li 
            className={activeSection === "notif-section" ? "active" : ""} 
            onClick={() => scrollToSection('notif-section')}
          >
            CHAT
          </li> */}
        </ul>
      </div>

      
    </nav>
  );
};

export default Navbar;