from fastapi import UploadFile
from pydantic import BaseModel, EmailStr




class AddassetResponse(BaseModel):
    message:str
    filename: str



class LoginRequest(BaseModel):
    username:str
    password:str
    
class ChatRequest(BaseModel):
    text: str

class SignupResponse(BaseModel):
    message: str
    username: str
    coverphoto: str
    citizenship: str



