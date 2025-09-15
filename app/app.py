from fastapi import Depends, FastAPI

from app.core.users import  current_active_user
from .models.user import User

from .api.v1.users import router as users_router
from .api.v1.auth import router as auth_router
app = FastAPI()


app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(users_router, prefix="/users", tags=["users"])


@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}