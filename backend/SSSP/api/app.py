from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import DataError, IntegrityError
from pydantic import ValidationError
from contextlib import asynccontextmanager

import os
import requests

# directory dependency
from SSSP.api.models import models
from SSSP.config import settings
from SSSP.api.exception.global_exception_handler import (
    global_exception_handler,
    sqlalchemy_data_error_handler,
    sqlalchemy_integrity_error_handler,
    pydantic_validation_exception_handler,
)
from SSSP.api.core.database import init_db_connection

# Router
from SSSP.api.routers.v1.api import router as v1api

import time
import logging

logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Application startup...")
    init_db_connection()
    yield
    print("Application shutdown...")

apimain = FastAPI(docs_url="/docs", redoc_url="/redoc", openapi_url="/openapi.json", lifespan=lifespan)
# apimain = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
apimain.include_router(v1api, prefix="/api/v1")
apimain.add_exception_handler(DataError, sqlalchemy_data_error_handler)
apimain.add_exception_handler(IntegrityError, sqlalchemy_integrity_error_handler)
apimain.add_exception_handler(Exception, global_exception_handler)
apimain.add_exception_handler(ValidationError, pydantic_validation_exception_handler)


@apimain.middleware("http")
async def error_notification_middleware(request, call_next):
    try:
        response = await call_next(request)

        if 400 <= response.status_code < 600:
            error_message = f"Status Code: {response.status_code}, Path: {request.url.path}, Method: {request.method}"
            print(error_message)

        return response
    except Exception as e:
        error_message = f"Internal Server Error: {str(e)}, Path: {request.url.path}, Method: {request.method}"
        raise e


# CORS
CORS_ORIGINS = os.getenv("CORS_ORIGINS")
if CORS_ORIGINS:
    CORS_ORIGINS = CORS_ORIGINS.split(" ")
else:
    CORS_ORIGINS = []

print(CORS_ORIGINS)
    
origins = CORS_ORIGINS
apimain.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# setup favicon
favicon_path = settings.favicon_path


@apimain.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(favicon_path)


@apimain.get("/health-check")
def health_check():
    return {"status": "healthy"}


@apimain.get("/")
def root():
    return {"Hello": "SSSP"}
