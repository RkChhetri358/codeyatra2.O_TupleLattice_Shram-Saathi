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



from schema import SignupResponse,LoginRequest


from fastapi import FastAPI, File, UploadFile, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
import models
from database import engine, get_db
from schema import SignupResponse # Ensure this has message, username, coverphoto, citizenship

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


@app.post("/api/login")
async def login(userdata:LoginRequest,db:Session=Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.username == userdata.username,
        models.User.password == userdata.password
    ).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    return {"message": "Login successful", "username": db_user.username}








# Create tables
models.Base.metadata.create_all(bind=engine)

#GETTING all userdetails of sign up 
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
        # Save Citizenship
        cz_path = f"citizenship/{citizenship.filename}"
        cz_content = await citizenship.read()
        with open(cz_path, "wb") as f:
            f.write(cz_content)

        # Save Cover Photo
        cp_path = f"coverphoto/{coverphoto.filename}"
        cp_content = await coverphoto.read()
        with open(cp_path, "wb") as f:
            f.write(cp_content)

        # Save to DB
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