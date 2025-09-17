import os
from dotenv import load_dotenv
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr

load_dotenv()

def str2bool(v: str) -> bool:
    return v.lower() in ("true", "1", "yes")

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT")),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS=str2bool(os.getenv("MAIL_STARTTLS")),
    MAIL_SSL_TLS=str2bool(os.getenv("MAIL_SSL_TLS")),
    USE_CREDENTIALS=str2bool(os.getenv("USE_CREDENTIALS")),
)

async def send_verification_email(email: EmailStr, link: str):
    message = MessageSchema(
        subject="Vérifie ton compte",
        recipients=[email],
        body=f"Merci de t’être inscrit ! Clique sur ce lien pour valider ton compte : {link}",
        subtype="plain"
    )
    fm = FastMail(conf)
    await fm.send_message(message)

