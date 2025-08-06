import os
import time
import logging
import pymysql
from pymysql.err import OperationalError
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from SSSP.api.models.models import Base, User
from SSSP.config import settings
from SSSP.api.core.auth import get_password_hash

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Database Connection Details from Environment Variables ---
DB_USER = os.getenv("MYSQL_USER", "test")
DB_PASSWORD = os.getenv("MYSQL_PASSWORD", "test")
DB_HOST = os.getenv("MYSQL_HOST", "sssp-database")
DB_PORT = int(os.getenv("MYSQL_PORT", 3306))
DB_NAME = os.getenv("MYSQL_DB", "sssp_database")
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

MAX_RETRIES = 30
RETRY_DELAY = 5

def wait_for_db():
    """Waits for the database to become available."""
    logger.info("Waiting for database to become available...")
    for i in range(MAX_RETRIES):
        try:
            conn = pymysql.connect(
                host=DB_HOST,
                port=DB_PORT,
                user=DB_USER,
                password=DB_PASSWORD,
                charset="utf8mb4"
            )
            conn.close()
            logger.info("Database is available.")
            return True
        except OperationalError as e:
            logger.warning(f"Database not ready yet (attempt {i+1}/{MAX_RETRIES}): {e}")
            time.sleep(RETRY_DELAY)
    logger.error("Database connection timed out after multiple retries.")
    return False

def create_database_if_not_exists():
    """Creates the database if it doesn't already exist."""
    logger.info(f"Ensuring database '{DB_NAME}' exists...")
    try:
        conn = pymysql.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            charset="utf8mb4"
        )
        with conn.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{DB_NAME}`")
        conn.close()
        logger.info(f"Database '{DB_NAME}' is ready.")
    except Exception as e:
        logger.error(f"Failed to create database: {e}")
        raise

def create_tables():
    """Creates the tables in the database."""
    logger.info("Creating tables...")
    try:
        engine = create_engine(DATABASE_URL, pool_pre_ping=True)
        Base.metadata.create_all(bind=engine)
        logger.info("Tables created successfully.")
    except Exception as e:
        logger.error(f"Failed to create tables: {e}")
        raise

def create_initial_admin_user():
    """Creates the initial admin user if one doesn't exist."""
    logger.info("Checking for initial admin user...")
    try:
        engine = create_engine(DATABASE_URL, pool_pre_ping=True)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        with SessionLocal() as db:
            existing_admin = db.query(User).filter(User.authority == "ADMIN").first()
            if not existing_admin:
                logger.info("Creating initial admin user...")
                new_admin = User(
                    username=settings.initial_account.INITIAL_ADMIN_ID,
                    email="admin@example.com",
                    hashed_password=get_password_hash(
                        settings.initial_account.INITIAL_ADMIN_PW
                    ),
                    contents="Initial Admin User",
                    authority="ADMIN",
                )
                db.add(new_admin)
                db.commit()
                logger.info("Initial admin user created successfully.")
            else:
                logger.info("Admin user already exists. Skipping creation.")
    except Exception as e:
        logger.error(f"Failed to create initial admin user: {e}")
        raise

if __name__ == "__main__":
    if wait_for_db():
        create_database_if_not_exists()
        create_tables()
        create_initial_admin_user()
    else:
        # Exit with an error code if the database is not available
        exit(1)