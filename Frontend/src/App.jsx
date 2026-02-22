import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./Components/Loginpage/Loginpage";
import Signup from "./components/Signup/Signup";

// Baki components haru paxi chaine bela uncomment garna sakincha
// import Dashboard from "./components/Dashboard/Dashboard";
// import Profile from "./components/Profile/Profile";
// import Layout from "./components/Layout/Layout";
// import Home from "./components/Home/Home";
// import AddAsset from "./Components/AddAsset/AddAsset";
// import Asset from "./Components/Asset/Asset";
// import SellingAsset from "./Components/SellingAsset/SellingAsset";
// import BuyingAsset from "./Components/BuyingAsset/BuyingAsset";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Layout and Protected Routes (Paxi use garna lai ready rakheko) */}
        {/* <Route path="/home" element={<Home />} />
        <Route path="/addasset" element={<AddAsset />} />
        <Route path="/layout" element={<Layout />}>
          <Route index element={<Dashboard />} />            
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route path="asset" element={<Asset/>} />
          <Route path="sellingasset" element={ <SellingAsset/>} />
          <Route path="buyingasset" element={ <BuyingAsset/>} />
          <Route path="profile" element={<Profile />} />
        </Route> 
        */}

        {/* Catch-all route: redirects to login if path doesn't match */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;