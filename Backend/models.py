from sqlalchemy import Column, Integer, String
from database import Base

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, unique=True, index=True)
#     email = Column(String, unique=True, index=True)
#     password = Column(String)  



# from sqlalchemy import Column, Integer, String
# from database import Base

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

    def __repr__(self):
        return f"<User(username={self.username}, role={self.role})>"