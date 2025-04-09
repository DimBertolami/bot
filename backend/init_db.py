import os
import sys
import logging

# First set up the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("db_init.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Import all models to ensure they're registered with Base
from sqlalchemy import create_engine
from database import Base
from models.trading_models import Trade, TradingDecision, ProfitSummary, BotThought, BotJoke
from models.model import Model

DATABASE_URL = "sqlite:///./new_test.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

def database_exists(db_url):
    return os.path.exists(db_url.split("///")[-1])

def init_db():
    if not database_exists(DATABASE_URL):
        logger.info("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    else:
        logger.info("Database already exists. No need to create tables.")

if __name__ == "__main__":
    init_db()
    print("Database initialized and tables created.")
