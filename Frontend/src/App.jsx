import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Loginpage/Loginpage";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
// 1. Exact Folder ra File name ConsumerHome nai hunu parchha
import ConsumerHome from "./Components/ConsumerHome/ConsumerHome"; 

// Baki components commented chhan
// import Dashboard from "./Components/Dashboard/Dashboard";
// import Profile from "./Components/Profile/Profile";
// import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        {/* 2. Aba URL ma "http://localhost:5184/ConsumerHome" handa yo khulchha */}
        <Route path="/ConsumerHome" element={<ConsumerHome />} />

        {/* Dashboard Layout Routes (Ready for future) */}
        {/* <Route path="/layout" element={<Layout />}>
          <Route index element={<Dashboard />} />            
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route path="profile" element={<Profile />} />
        </Route> 
        */}

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;