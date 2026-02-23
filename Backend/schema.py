from fastapi import UploadFile
from pydantic import BaseModel, EmailStr
from typing import List, Optional




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


from pydantic import BaseModel
from typing import Optional

class ProfileUpdate(BaseModel):
    user_id: int
    name: str
    base_price: str
    phone: str
    address: str
    work_type: str

class ApplicationRequest(BaseModel):
    job_id: int
    username: str
    duration: str
    phone: str
    address: str
    work_type: str
    additional_info: Optional[str] = None
