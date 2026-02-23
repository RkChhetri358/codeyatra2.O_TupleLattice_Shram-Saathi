from fastapi import FastAPI, APIRouter, HTTPException, status, Depends, File, UploadFile, Form, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
import shutil
from typing import List, Optional, Dict
from dotenv import load_dotenv
from groq import Groq

# Local imports
from database import engine, get_db
import models
from schema import SignupResponse, LoginRequest, ChatRequest,ProfileUpdate, ApplicationRequest

# Load environment variables
load_dotenv()

# Initialize App
app = FastAPI()

# Initialize AI Client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# 1. CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Database & Folders Setup
models.Base.metadata.create_all(bind=engine)

for folder in ["projects", "coverphoto", "citizenship"]:
    if not os.path.exists(folder):
        os.makedirs(folder)

app.mount("/projects", StaticFiles(directory="projects"), name="projects")

# 3. Connection Manager for WebSockets
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    async def send_personal_message(self, message: dict, user_id: int):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_json(message)

manager = ConnectionManager()

# --- API ROUTES ---

@app.post("/api/login")
async def login(userdata: LoginRequest, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.username == userdata.username,
        models.User.password == userdata.password
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid username or password"
        )
    
    return {
        "message": "Login successful",
        "username": db_user.username,
        "role": db_user.role,
        "id": db_user.id,
        "mobile": db_user.mobilenumber
    }

@app.post("/api/signup/", response_model=SignupResponse)
async def signup(
    username: str = Form(...), 
    mobilenumber: str = Form(...), 
    address: str = Form(...), 
    password: str = Form(...),
    role: str = Form(...), 
    citizenship: UploadFile = File(...), 
    coverphoto: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    try:
        cz_path = f"citizenship/{citizenship.filename}"
        with open(cz_path, "wb") as f:
            f.write(await citizenship.read())

        cp_path = f"coverphoto/{coverphoto.filename}"
        with open(cp_path, "wb") as f:
            f.write(await coverphoto.read())

        new_user = models.User(
            username=username, mobilenumber=mobilenumber, address=address,
            password=password, role=role, coverphoto=cp_path, citizenship=cz_path
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"message": "Signup Successful", "username": new_user.username, "coverphoto": coverphoto.filename, "citizenship": citizenship.filename}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/allprojects")
async def get_all_projects(db: Session = Depends(get_db)):
    return db.query(models.AddProject).all()

# --- CHAT & AI ROUTES ---

@app.get("/api/chat/history/{user_id}/{target_id}")
async def get_chat_history(user_id: int, target_id: int, db: Session = Depends(get_db)):
    return db.query(models.ChatMessage).filter(
        ((models.ChatMessage.sender_id == user_id) & (models.ChatMessage.recipient_id == target_id)) |
        ((models.ChatMessage.sender_id == target_id) & (models.ChatMessage.recipient_id == user_id))
    ).order_by(models.ChatMessage.timestamp.asc()).all()

@app.websocket("/ws/chat/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
    await manager.connect(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            new_msg = models.ChatMessage(sender_id=user_id, recipient_id=data["recipient_id"], text=data["text"])
            db.add(new_msg)
            db.commit()
            await manager.send_personal_message({"sender_id": user_id, "text": data["text"]}, int(data["recipient_id"]))
    except WebSocketDisconnect:
        manager.disconnect(user_id)

def get_ai_response(user_text: str):
    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "You are ShramSaathi assistant. Help users with labor work. Speak in Nepali only."},
            {"role": "user", "content": user_text}
        ]
    )
    return completion.choices[0].message.content

@app.post("/api/chat/voice")
async def chat_with_voice(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with open(temp_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            file=(temp_path, audio_file.read()),
            model="whisper-large-v3",
            language="ne",
            response_format="text"
        )
    os.remove(temp_path)
    return {"user_text": transcription, "bot_reply": get_ai_response(transcription)}




# --- Additional Imports ---
from pydantic import BaseModel
from typing import List, Optional

# --- New Pydantic Schemas ---
class JobApplication(BaseModel):
    job_id: int
    username: str
    duration: str
    phone: str
    address: str
    work_type: str
    additional_info: Optional[str] = None

class ProfileUpdate(BaseModel):
    user_id: int
    name: str
    base_price: str
    phone: str
    address: str
    work_type: str

# --- API Endpoints ---

# 1. Fetch Projects for the Work Grid
@app.get("/api/jobs")
async def get_jobs(db: Session = Depends(get_db)):
    projects = db.query(models.AddProject).all()
    # Map database fields to the Home.jsx 'jobs' state
    return [
        {
            "id": p.id,
            "title": p.project_name,
            "count": "Active", # Example placeholder
            "img": f"http://127.0.0.1:8000/{p.file_path}" if p.file_path else "/1.png",
            "desc": p.description,
            "address": p.address
        } for p in projects
    ]

# 2. Handle Job Applications
@app.post("/api/apply")
async def apply_job(application: JobApplication):
    # Log application (In production, save to a 'models.Application' table)
    print(f"Application from {application.username} for job {application.job_id}")
    return {"status": "success", "message": "आवेदन प्राप्त भयो (Application Received)"}

# 3. Update User Profile Section
@app.post("/api/profile/update")
async def update_profile(profile: ProfileUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == profile.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.username = profile.name
    user.mobilenumber = profile.phone
    user.address = profile.address
    # Update other fields as needed
    db.commit()
    return {"message": "Profile updated successfully"}

# 4. Fetch Notifications Section
@app.get("/api/notifications/{user_id}")
async def get_notifs(user_id: int):
    # Example logic: Find projects associated with this user
    return [
        {"id": 1, "title": "Project Request", "message": "You have a new work request."}
    ]
    
    