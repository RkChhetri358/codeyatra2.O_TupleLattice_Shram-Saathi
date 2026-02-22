

from fastapi import FastAPI, APIRouter, HTTPException, status,Depends,File, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
import os


from dotenv import load_dotenv
load_dotenv()

from groq import Groq
import shutil

router = APIRouter()
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

from database import engine, get_db
import models
from typing import Optional

from pydantic import BaseModel

import requests



from schema import SignupResponse,LoginRequest


from fastapi import FastAPI, File, UploadFile, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
import models
from database import engine, get_db
from schema import SignupResponse,ChatRequest# Ensure this has message, username, coverphoto, citizenship

app = FastAPI()

# 1. CORS Middleware (Must be exactly like this)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create the database tables
models.Base.metadata.create_all(bind=engine)





@app.get("/api/hello")
async def hello():
    return {"message": "Hello, World!"}


# @app.post("/api/login")
# async def login(userdata:LoginRequest,db:Session=Depends(get_db)):
#     db_user = db.query(models.User).filter(
#         models.User.username == userdata.username,
#         models.User.password == userdata.password
#     ).first()

#     if not db_user:
#         raise HTTPException(status_code=400, detail="Invalid username or password")
    
#     return {"message": "Login successful", "username": db_user.username,"id": db_user.id}
@app.post("/api/login")
async def login(userdata: LoginRequest, db: Session = Depends(get_db)):
    # 1. Look for the user in the database
    db_user = db.query(models.User).filter(
        models.User.username == userdata.username,
        models.User.password == userdata.password
    ).first()

    # 2. If user doesn't exist, throw 401
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid username or password"
        )
    
    # 3. Return all necessary info for the frontend
    return {
        "message": "Login successful",
        "username": db_user.username,
        "role": db_user.role,       # 'user' or 'consumer'
        "id": db_user.id,           # Required for consumer_id in projects
        "mobile": db_user.mobilenumber # Required for phone_number in projects
    }


@app.post("/api/postProjectDetails")
async def post_project_details(
    project_name: str = Form(...),
    duration: str = Form(...),
    phone_number: str = Form(...),
    address: str = Form(...),
    project_type: str = Form(...),
    description: str = Form(...),
    consumer_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
     
        file_location = f"projects/{file.filename}"
        os.makedirs("projects", exist_ok=True)
        with open(file_location, "wb") as f:
            f.write(await file.read())

            new_project = models.AddProject(
                project_name=project_name,
                duration=duration,
                phone_number=phone_number,
                address=address,
                project_type=project_type,
                description=description,
                file_path=file_location,
                consumer_id=consumer_id
            )
            db.add(new_project)
            db.commit()
            db.refresh(new_project)

        return {"message": "Project details posted successfully", "file_path": file_location}
    except Exception as e:
        print(f"Error posting project details: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to post project details")




 

models.Base.metadata.create_all(bind=engine)


@app.get("/api/allusers")
async def get_all_users(db: Session = Depends(get_db)):
    all_users = db.query(models.Asset).all()
    return all_users

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
    # Ensure directories
    os.makedirs("coverphoto", exist_ok=True)
    os.makedirs("citizenship", exist_ok=True)

    try:
     
        cz_path = f"citizenship/{citizenship.filename}"
        cz_content = await citizenship.read()
        with open(cz_path, "wb") as f:
            f.write(cz_content)

        cp_path = f"coverphoto/{coverphoto.filename}"
        cp_content = await coverphoto.read()
        with open(cp_path, "wb") as f:
            f.write(cp_content)

   
        new_user = models.User(
            username=username,
            mobilenumber=mobilenumber,
            address=address,
            password=password,
            role=role,
            coverphoto=cp_path,
            citizenship=cz_path
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "message": "Signup Successful", 
            "username": new_user.username,
            "coverphoto": coverphoto.filename,
            "citizenship": citizenship.filename
        }

    except Exception as e:
        db.rollback()
        print(f"CRITICAL ERROR: {str(e)}") # LOOK AT YOUR TERMINAL FOR THIS
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
    
    
    
    #view all allProjects
from fastapi import HTTPException
from sqlalchemy.orm import Session
import models

@app.get("/api/allprojects")
async def get_all_projects(db: Session = Depends(get_db)):
    try:
      
        all_projects = db.query(models.AddProject).all()
       
        return all_projects

    except Exception as e:
        
        print(f"Error fetching projects: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Internal Server Error: Could not retrieve projects"
        )
    
    
    
    
    

# Mount the 'projects' folder to the '/projects' URL path
app.mount("/projects", StaticFiles(directory="projects"), name="projects")
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    # 1. AI Brain (Nepali Support)
def get_ai_response(user_text: str):
    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "You are ShramSaathi assistant. Help users with labor work. Speak in Nepali only."},
            {"role": "user", "content": user_text}
        ]
    )
    return completion.choices[0].message.content

# The `# 2. Voice-to-Text Endpoint` section of the code defines a POST endpoint for handling voice
# input. When a user sends a voice file to this endpoint, the file is saved temporarily, and then the
# content of the audio file is transcribed into text using the Groq API's audio transcription service.
# 2. Voice-to-Text Endpoint
@router.post("/api/chat/voice")
async def chat_with_voice(file: UploadFile = File(...)):
    # Save temporary audio file
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Note: In a production app, you'd call a Whisper model here.
    # For a quick start, use OpenAI or Groq's Whisper API:
    with open(temp_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            file=(temp_path, audio_file.read()),
            model="whisper-large-v3",
            language="ne", # Nepali
            response_format="text"
        )
    
    os.remove(temp_path)
    
    # Get AI response in Nepali
    ai_reply = get_ai_response(transcription)
    
    return {"user_text": transcription, "bot_reply": ai_reply}

@app.post("/api/chat/text")
async def chat_with_text(request: ChatRequest):
    try:
        reply = get_ai_response(request.text)
        return {"bot_reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# IMPORTANT: Link the router if you use it in separate files
app.include_router(router)