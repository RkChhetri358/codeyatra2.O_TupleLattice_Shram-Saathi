from turtle import title

from fastapi import FastAPI, HTTPException, status,Depends,File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
import os


from database import engine, get_db
import models
from typing import Optional

from pydantic import BaseModel

import requests



from schema import SignupRequest,SignupResponse,AddassetResponse,LoginRequest

app = FastAPI()

# --- CORS SETTINGS ---
# This allows your React app to talk to your FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Add your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create the database tables
models.Base.metadata.create_all(bind=engine)





@app.get("/api/hello")
async def hello():
    return {"message": "Hello, World!"}


@app.post("/api/login")
async def login(userdata:LoginRequest,db:Session=Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.username == userdata.username,
        models.User.password == userdata.password
    ).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    return {"message": "Login successful", "username": db_user.username}



