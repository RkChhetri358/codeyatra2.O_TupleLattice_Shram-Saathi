import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import axios from "axios";

const API_BASE = "http://localhost:8000"; // ✅ Use ONE consistent host

export default function VoiceChat({ currentUserId, targetUserId, targetUserName }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const socket = useRef(null);
  const scrollRef = useRef(null);

  // ✅ Fetch chat history (ONLY ONCE)
  useEffect(() => {
    if (!targetUserId || !currentUserId) return;

    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/chat/history/${currentUserId}/${targetUserId}`
        );

        const formattedHistory = res.data.map((msg) => ({
          sender: msg.sender_id === Number(currentUserId) ? "me" : "them",
          text: msg.text,
        }));

        setMessages(formattedHistory);
      } catch (err) {
        console.error("History Load Error:", err);
      }
    };

    fetchHistory();
  }, [currentUserId, targetUserId]);

  // ✅ WebSocket connection
  useEffect(() => {
    if (!currentUserId) return;

    socket.current = new WebSocket(
      `ws://localhost:8000/ws/chat/${currentUserId}`
    );

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (Number(data.sender_id) === Number(targetUserId)) {
        setMessages((prev) => [
          ...prev,
          { sender: "them", text: data.text },
        ]);
        speak(data.text);
      }
    };

    socket.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      socket.current?.close();
    };
  }, [currentUserId, targetUserId]);

  // ✅ Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Voice input
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ne-NP";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendChatMessage(transcript);
    };

    recognition.start();
  };

  // ✅ Send message
  const sendChatMessage = (text) => {
    if (!text.trim() || !socket.current) return;

    const payload = {
      recipient_id: Number(targetUserId),
      text: text,
    };

    socket.current.send(JSON.stringify(payload));

    setMessages((prev) => [...prev, { sender: "me", text }]);
    setInputText("");
  };

  // ✅ Text-to-speech
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
          <div
            key={i}
            className={`message-bubble ${
              m.sender === "me" ? "message-me" : "message-them"
            }`}
          >
            {m.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="input-area">
        <button
          className={`mic-button ${isListening ? "recording" : ""}`}
          onMouseDown={handleVoiceInput}
        >
          🎤
        </button>

        <input
          className="chat-input"
          type="text"
          placeholder="नेपालीमा सन्देश लेख्नुहोस्..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && sendChatMessage(inputText)
          }
        />

        <button
          className="send-btn"
          onClick={() => sendChatMessage(inputText)}
        >
          ➤
        </button>
      </div>
    </div>
  );
}