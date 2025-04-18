from pydantic_settings import BaseSettings
from fastapi.security import OAuth2PasswordBearer
from typing import ClassVar
from pydantic import Field

import os

class Ban:
    ban_list: list = os.getenv("BAN") if os.getenv("BAN") else []

class Jwt:
    secret_key: str = os.getenv("JWT_SECRET_KEY")
    algorithm: str = os.getenv("JWT_ALGORITHM")
    token_expire_minutes: int = os.getenv("JWT_TOKEN_EXPIRE_MINUTES")


class Database:
    def __init__(self):
        self.MYSQL_HOST = os.getenv("MYSQL_HOST")
        self.MYSQL_DB = os.getenv("MYSQL_DB")
        self.MYSQL_USER = os.getenv("MYSQL_USER")
        self.MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
        self.MYSQL_PORT = os.getenv("MYSQL_PORT")
        self.DATABASE_URL = f"mysql+pymysql://{self.MYSQL_USER}:{self.MYSQL_PASSWORD}@{self.MYSQL_HOST}:{self.MYSQL_PORT}/{self.MYSQL_DB}"

class InitialAdmin:
    def __init__(self):
        self.INITIAL_ADMIN_ID = os.getenv("INITIAL_ADMIN_ID")
        self.INITIAL_ADMIN_PW = os.getenv("INITIAL_ADMIN_PW")

class RedisSettings(BaseSettings):
    REDIS_HOST: str = os.getenv("REDIS_HOST", "")
    REDIS_PORT: int = os.getenv("REDIS_PORT", 1111)


class EmailSettings(BaseSettings):
    sender_email: str = Field(default=None)
    sender_password: str = Field(default=None)

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "allow",
    }

class Settings(BaseSettings):
    app_name: str = "Soongsil Security Playground"
    favicon_path: str = "./SSSP/static/favicon.ico"

    ban_info: Ban = Ban()
    jwt: Jwt = Jwt()
    oauth2_scheme: ClassVar[OAuth2PasswordBearer] = OAuth2PasswordBearer(
        tokenUrl="/api/v1/auth/login"
    )
    database: Database = Database()
    initial_account: InitialAdmin = InitialAdmin()
    redis: RedisSettings = RedisSettings()
    email: EmailSettings = EmailSettings(
        sender_email=os.getenv("GOOGLE_EMAIL", ''),
        sender_password=os.getenv("GOOGLE_EMAIL_SECRET", ''),
    )

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "allow",
    }

    use_email_auth: bool = os.getenv("USE_EMAIL_AUTH").lower() == "true"
    challenge_file_path: str = os.getenv("CHALLENGE_DIR", "")
    backend_url: str = os.getenv("REACT_APP_BACKEND_URL")

settings = Settings()
