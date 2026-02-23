import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Loginpage/Loginpage";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";

import VoiceChat from "./Components/VoiceChat/VoiceChat";

import ConsumerHome from "./Components/ConsumerHome/ConsumerHome"; 
import RatingPop from "./Components/Ratingpop/Ratingpop";
import Pragati from "./Components/Pragati/Pragati";
import WorkerSelectionModal from "./Components/WorkerSelectionModal/WorkerSelectionModal";
import Payment from "./Components/Payment/Payment";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Ratingpop" element={<RatingPop />} />
        <Route path="/pragati" element={<Pragati />} />
        <Route path="/chatbot" element={<VoiceChat currentUserId={1} targetUserId={2} targetUserName="John Doe" />} />
        <Route path="/Payment" element={<Payment proposedPrice={5000} onClose={() => window.history.back()} />} />
       

       
        <Route path="/home" element={<Home />} /> 

       
        <Route path="/ConsumerHome" element={<ConsumerHome />} />
        <Route path="/WorkerSelectionModal" element={<WorkerSelectionModal/>} />

 
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      
    </Router>
  );
}

export default App;