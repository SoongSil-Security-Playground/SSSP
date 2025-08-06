from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# directory dependency

from SSSP.config import settings

engine = None
SessionLocal = None
Base = declarative_base()

def init_db_connection():
    global engine, SessionLocal
    engine = create_engine(settings.database.DATABASE_URL, pool_pre_ping=True)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.bind = engine

    # print("create db")
    # if wait_for_db():
    #     create_database_if_not_exists()
    #     create_tables()
    #     create_initial_admin_user()
    # else:
    #     # Exit with an error code if the database is not available
    #     exit(1)


def get_db():
    if SessionLocal is None:
        raise Exception("Database not initialized")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
