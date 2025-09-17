from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import Column, String

from .base import Base


class User(SQLAlchemyBaseUserTableUUID, Base):
    name = Column(String(255), nullable=True)