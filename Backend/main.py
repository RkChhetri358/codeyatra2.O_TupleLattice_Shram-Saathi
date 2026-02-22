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



# @app.post("/api/signup/", response_model=SignupResponse, status_code=status.HTTP_201_CREATED)
# async def signup(
#     userdata: SignupRequest, db: Session = Depends(get_db)):

#     # 1. Check if username exists
#     db_user_by_name = db.query(models.User).filter(
#         models.User.username == userdata.username
#     ).first()
    
#     if db_user_by_name:
#         raise HTTPException(status_code=400, detail="Username already taken")

#     # 2. NEW: Check if email exists to avoid the IntegrityError
#     db_user_by_email = db.query(models.User).filter(
#         models.User.email == userdata.email
#     ).first()

#     if db_user_by_email:
#         raise HTTPException(status_code=400, detail="Email already registered")
    
#     # 3. Proceed if both are unique
#     new_user = models.User(
#         username=userdata.username,
#         email=userdata.email,
#         password=userdata.password
#     )

#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)    
    
#     return {
#         "message": "Signup Successful! Please login.",
#         "username": userdata.username
#     }









import os # Make sure this is at the top of your main.py
@app.post("/api/signup/", response_model=SignupResponse) # Use your class here
async def signup(
    username: str = Form(...), 
    mobilenumber: str = Form(...), 
    address: str = Form(...), 
    role: str = Form(...), 
    password: str = Form(...),
    citizenship: UploadFile = File(...), 
    coverphoto: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    # 1. Save the file
    if not os.path.exists("coverphoto"):
     
        os.makedirs("coverphoto")
        
    file_location_coverphoto = f"coverphoto/{coverphoto.filename}"
    content = await coverphoto.read()
    
    with open(file_location_coverphoto, "wb") as f:
        f.write(content)
        
    if not os.path.exists("citizenship"):
     
        os.makedirs("citizenship")
        
    file_location_citizenship = f"citizenship/{citizenship.filename}"
    content = await citizenship.read()
    
    with open(file_location_citizenship, "wb") as f:
        f.write(content)
    
    with open(file_location_coverphoto, "wb") as f:
        f.write(content)

    # 2. Save to Database using the Model
    new_asset = models.Asset(
        username=username,
        mobilenumber=mobilenumber,
        address=address,
        password=password,
        coverphoto=file_location_coverphoto,
        citizenship=file_location_citizenship
    )

    db.add(new_asset)
    db.commit()
    db.refresh(new_asset)

    # 3. Return data that matches your AddassetResponse class
    return {
        "message": "Added Successfully", 
        "coverphoto": coverphoto.filename,
        "citizenship": citizenship.filename
    }


#GETTING all userdetails of sign up 
@app.get("/api/allusers")
async def get_all_users(db: Session = Depends(get_db)):
    all_users = db.query(models.Asset).all()
    return all_users