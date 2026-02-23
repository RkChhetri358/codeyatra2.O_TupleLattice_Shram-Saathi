import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Loginpage/Loginpage";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
import WorkerSelectionModal from "./Components/WorkerSelectionModal/WorkerSelectionModal"; 
import Payment from "./Components/Payment/Payment";
import RatingPop from "./Components/Ratingpop/Ratingpop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} /> 

        {/* Browser URL: http://localhost:5192/WorkerSelectionModal */}
        <Route path="/WorkerSelectionModal" element={<WorkerSelectionModal />} />
        
        <Route path="/Payment" element={<Payment proposedPrice={5000} onClose={() => window.history.back()} />} />
        <Route path="/Ratingpop" element={<RatingPop />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;