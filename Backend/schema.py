from fastapi import UploadFile
from pydantic import BaseModel, EmailStr




class AddassetResponse(BaseModel):
    message:str
    filename: str



class LoginRequest(BaseModel):
    username:str
    password:str
    
    