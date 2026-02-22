import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";

export default function VoiceChat({ currentUserId, targetUserId, targetUserName }) {


   
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const socket = useRef(null);
  const scrollRef = useRef(null);

  // Initialize WebSocket connection
  useEffect(() => {
    socket.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${currentUserId}`);

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, { sender: "them", text: data.text }]);
      speak(data.text); // Voice feedback for incoming messages
    };

    return () => socket.current.close();
  }, [currentUserId]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Your browser does not support voice recognition.");

    const recognition = new SpeechRecognition();
    recognition.lang = "ne-NP"; // Recognize Nepali

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendChatMessage(transcript);
    };

    recognition.start();
  };

  const sendChatMessage = (text) => {
    if (!text.trim()) return;
    const payload = { recipient_id: targetUserId, text: text };
    socket.current.send(JSON.stringify(payload));
    setMessages((prev) => [...prev, { sender: "me", text: text }]);
    setInputText("");
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ne-NP";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="user-info">
          <div className="avatar">👤</div>
          <span>{targetUserName || "User"}</span>
        </div>
      </div>

      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`message-bubble ${m.sender === "me" ? "message-me" : "message-them"}`}>
            {m.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="input-area">
        <button className={`mic-button ${isListening ? "recording" : ""}`} onMouseDown={handleVoiceInput}>
          🎤
        </button>
        <input
          className="chat-input"
          type="text"
          placeholder="नेपालीमा सन्देश लेख्नुहोस्..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendChatMessage(inputText)}
        />
        <button className="send-btn" onClick={() => sendChatMessage(inputText)}>➤</button>
      </div>
    </div>
  );
};


