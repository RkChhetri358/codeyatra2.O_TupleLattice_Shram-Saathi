# 🛠️ Shram-Saathi (श्रम Saathi)


> A smart platform connecting skilled workers (electricians, plumbers, carpenters, etc.) with service seekers in Nepal.

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Installation](#-installation)
- [API Usage](#-api-usage)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Problem Statement

In Nepal, millions of blue-collar workers — electricians, plumbers, carpenters, painters, and daily wage laborers — remain **digitally excluded** from the growing online job market. Key barriers include:

- **Low digital literacy** — Complex apps and platforms are inaccessible
- **Language barriers** — Most platforms operate only in English
- **Lack of formal profiles** — No way to showcase skills or build reputation
- **Limited connectivity** — Reliance on word-of-mouth referrals limits opportunities

This digital divide perpetuates economic inequality and limits access to fair wages and consistent work opportunities for informal sector workers.

---

## 💡 Solution Overview

**Shram-Saathi** bridges this gap by providing:

1. **Simple, Accessible Interface** — Designed for users with minimal digital experience
2. **Multilingual Support** — Full support for both **Nepali (ने)** and **English**
3. **Voice-First Interaction** — AI chatbot with speech recognition for hands-free operation
4. **Smart Job Matching** — Connects workers with relevant opportunities based on skills and location
5. **Real-Time Communication** — WebSocket-powered chat between workers and service seekers

---

## ✨ Key Features

### 👷 Worker Profile System
- Create profiles with skills, work experience, and location
- Upload citizenship documents and cover photos for verification
- Showcase completed projects and build reputation

### 🔍 Smart Job Recommendations
- Browse available projects with detailed descriptions
- Filter by location, duration, and job type
- Apply directly through the platform

### 🌐 Multilingual Support
- Full Nepali language interface
- AI assistant responds in Nepali for natural interaction
- Speak in Nepali to interact with the user


### 💬 Real-Time Messaging
- WebSocket-based instant messaging
- Direct communication between workers and consumers
- Chat history preservation

### 🎨 Accessible Design
- Clean, intuitive UI for low-digital-literacy users
- Large buttons and clear navigation

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Landing    │  │  Job Board  │  │  Voice Chat / Chatbot   │  │
│  │  Page       │  │  & Profiles │  │  (Speech Recognition)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP / WebSocket
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FASTAPI BACKEND                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Auth API   │  │  Project    │  │  AI/Voice Processing    │  │
│  │  (Login/    │  │  Management │  │  (Groq + Whisper)       │  │
│  │  Signup)    │  │  API        │  │                         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
│  ┌─────────────────────┐        ┌─────────────────────────────┐ │
│  │  SQLite Database    │        │  File Storage               │ │
│  │  (Users, Projects,  │        │  (Citizenship, Cover Photos,│ │
│  │   Chat Messages)    │        │   Project Images)           │ │
│  └─────────────────────┘        └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, React Router, Axios, FontAwesome |
| **Backend** | FastAPI, Python 3.10+, Pydantic |
| **Database** | SQLite with SQLAlchemy ORM |
| **Real-Time** | WebSockets for live chat |
| **Voice** | Web Speech API (Browser), SpeechSynthesis (TTS) |
| **Styling** | CSS3, React Bootstrap |
| **AI/NLP** | Groq API (LLaMA 3), Whisper Large v3 (Speech-to-Text) |
---

## 📁 Folder Structure

```
codeyatra2.O_TupleLattice_Shram-Saathi/
│
├── Backend/
│   ├── main.py              # FastAPI application & routes
│   ├── database.py          # SQLAlchemy database configuration
│   ├── models.py            # ORM models (User, Project, ChatMessage)
│   ├── schema.py            # Pydantic request/response schemas
│   ├── requirements.txt     # Python dependencies
│   ├── citizenship/         # User citizenship document uploads
│   ├── coverphoto/          # User profile photo uploads
│   └── projects/            # Project image uploads
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── main.jsx         # React entry point
│   │   └── Components/
│   │       ├── Chatbot/     # Voice-enabled AI chatbot
│   │       ├── Home/        # Worker dashboard
│   │       ├── ConsumerHome/# Service seeker dashboard
│   │       ├── LandingPage/ # Public landing page
│   │       ├── Loginpage/   # Authentication pages
│   │       ├── Signup/      # User registration
│   │       ├── Payment/     # Payment processing
│   │       ├── VoiceChat/   # Real-time voice communication
│   │       └── ...          # Other components
│   ├── package.json         # Node.js dependencies
│   └── vite.config.js       # Vite configuration
│
└── README.md                # Project documentation
```

---

## 🚀 Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create a .env file with:
echo "GROQ_API_KEY=your_groq_api_key_here" > .env

# Run the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## 📡 API Usage

### Authentication

**Login**
```bash
POST /api/login
Content-Type: application/json

{
  "username": "worker123",
  "password": "securepassword"
}
```

**Signup**
```bash
POST /api/signup/
Content-Type: multipart/form-data

- username: string
- mobilenumber: string
- address: string
- password: string
- role: "worker" | "consumer"
- citizenship: file
- coverphoto: file
```

### Projects

**Get All Projects**
```bash
GET /api/allprojects
```

**Post a New Project**
```bash
POST /api/postProjectDetails
Content-Type: multipart/form-data

- project_name: string
- duration: string
- phone_number: string
- address: string
- project_type: string
- description: string
- consumer_id: integer
- base_price: string
- file: image
```

### Voice Chat

**Send Voice Message**
```bash
POST /api/chat/voice
Content-Type: multipart/form-data

- file: audio file (Nepali speech)

Response:
{
  "user_text": "transcribed text",
  "bot_reply": "AI response in Nepali"
}
```

### WebSocket Chat

```javascript
// Connect to WebSocket
const ws = new WebSocket("ws://localhost:8000/ws/chat/{user_id}");

// Send message
ws.send(JSON.stringify({
  recipient_id: 2,
  text: "नमस्ते, के तपाईं उपलब्ध हुनुहुन्छ?"
}));
```

---

## 🔮 Future Improvements

| Feature | Description |
|---------|-------------|
| 📱 **Mobile App** | Native Android/iOS app for better accessibility |
| 🎙️ **Full Voice Input** | Navigate entire platform using voice commands |
| ✅ **Worker Verification** | Government ID and skill certification verification |
| ⭐ **Rating & Reviews** | Build worker reputation through verified reviews |
| 🛡️ **Safety Scoring** | Trust scores based on completed jobs and feedback |
| 💳 **Integrated Payments** | eSewa/Khalti integration for secure transactions |
| 📍 **GPS Matching** | Location-based worker discovery |
| 📊 **Analytics Dashboard** | Insights for workers on earning trends |
| 🤖 **Advanced AI Matching** | Semantic similarity for better job recommendations |
| 📞 **Video Consultation** | Video calls for project discussions |

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint configuration for JavaScript/React
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### Reporting Issues

Found a bug or have a suggestion? [Open an issue](../../issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**TupleLattice** - CodeYatra 2.0 Hackathon

---

<div align="center">
  <strong>Built with ❤️ for Nepal's workforce</strong>
  <br>
  <sub>श्रम Saathi</sub>
</div>
