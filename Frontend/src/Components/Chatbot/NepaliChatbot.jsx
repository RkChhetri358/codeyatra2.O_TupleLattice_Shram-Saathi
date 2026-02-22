import React, { useState } from "react";
import axios from "axios";

export default function NepaliChatbot() {



 const [isRecording, setIsRecording] = useState(false);
  const [chat, setChat] = useState({ user: "", bot: "" });
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ne-NP'; // Set language to Nepali

    recognition.onstart = () => setIsRecording(true);
    
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setIsRecording(false);
      
      // Send text to your FastAPI AI endpoint
      const res = await axios.post("http://127.0.0.1:8000/api/chat/text", {
        text: transcript
      });
      
      setChat({ user: transcript, bot: res.data.bot_reply });
      
      // OPTIONAL: Speak the bot reply
      speak(res.data.bot_reply);
    };

    recognition.start();
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ne-NP';
    window.speechSynthesis.speak(utterance);
  };



  return (
    <div className="chatbot-section">
      <button onClick={startListening} className={isRecording ? "mic-on" : ""}>
        {isRecording ? "सुनिरहेको छु..." : "आवाजमा कुरा गर्नुहोस् (Mic)"}
      </button>
      {chat.user && <p>तपाईं: {chat.user}</p>}
      {chat.bot && <p>साथी: {chat.bot}</p>}
    </div>
  );
}






