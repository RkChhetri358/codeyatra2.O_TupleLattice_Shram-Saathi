from fastapi import UploadFile
from pydantic import BaseModel, EmailStr




class AddassetResponse(BaseModel):
    message:str
    filename: str



class LoginRequest(BaseModel):
    username:str
    password:str
    


class SignupRequest(BaseModel):
    username:str
    email:EmailStr
    password:str
    address:str
    phone:str
    
class SignupResponse(BaseModel):
    message:str
    username:str