from sqlalchemy import Column, Integer, String,ForeignKey,Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

# # class User(Base):
# #     __tablename__ = "users"

# #     id = Column(Integer, primary_key=True, index=True)
# #     username = Column(String, unique=True, index=True)
# #     email = Column(String, unique=True, index=True)
# #     password = Column(String)  



from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    
    email = Column(String, unique=True, index=True, nullable=True)
    password = Column(String)
    
   
    mobilenumber = Column(String, unique=True, index=True)
    address = Column(String)
    role = Column(String, default="user") 
    
    citizenship = Column(String) 
    coverphoto = Column(String)
    # projects = relationship("AddProject", back_populates="owner")

    def __repr__(self):
        return f"<User(username={self.username}, role={self.role})>"
    
    
class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer)
    recipient_id = Column(Integer)
    text = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    
    
class AddProject(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String, index=True)
    duration = Column(String)
    
  
    phone_number = Column(String) 
    
    address = Column(String)
    project_type = Column(String)
    description = Column(String)
    file_path = Column(String)
    

    consumer_id = Column(Integer, ForeignKey("users.id"))

    # owner = relationship("User", back_populates="projects")

    def __repr__(self):
        return f"<Project(name={self.project_name}, consumer_id={self.consumer_id} , phone_number={self.phone_number} )>"


# from sqlalchemy import Column, Integer, String, ForeignKey
# from sqlalchemy.orm import relationship
# from database import Base

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, unique=True, index=True)
#     email = Column(String, unique=True, index=True, nullable=True)
#     password = Column(String)
#     mobilenumber = Column(String, unique=True, index=True)
#     address = Column(String)
#     role = Column(String, default="user") 
#     citizenship = Column(String) # Stores the path to the image
#     coverphoto = Column(String)  # Stores the path to the image

#     # Relationship to Projects
#     projects = relationship("AddProject", back_populates="owner")

#     def __repr__(self):
#         return f"<User(username={self.username}, role={self.role})>"

# class AddProject(Base):
#     __tablename__ = "projects"

#     id = Column(Integer, primary_key=True, index=True)
#     project_name = Column(String, index=True)
#     duration = Column(String)
#     phone_number = Column(String) 
#     address = Column(String)
#     project_type = Column(String)
#     description = Column(String)

#     owner_id = Column(Integer, ForeignKey("users.id"))
    
#     # Relationship back to User
#     owner = relationship("User", back_populates="projects")

#     def __repr__(self):
#         return f"<Project(name={self.project_name}, owner_id={self.owner_id})>"