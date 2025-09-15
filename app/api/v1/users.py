from fastapi import APIRouter
from app.schemas.user_schema import UserRead, UserUpdate
from app.core.users import fastapi_users

router = APIRouter()


router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate)
)