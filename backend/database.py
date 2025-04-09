from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from models.trade import Trade, Position, Base
from typing import Optional, Dict, Any
from datetime import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./trading_bot.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

def get_db():
    """Get a database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Database:
    def __init__(self, db: Session):
        self.db = db

    def add_trade(self, trade_data: Dict[str, Any]) -> Dict[str, Any]:
        """Add a new trade record"""
        trade = Trade(
            symbol=trade_data['symbol'],
            quantity=trade_data['quantity'],
            price=trade_data['price'],
            type=trade_data['type']
        )
        self.db.add(trade)
        self.db.commit()
        self.db.refresh(trade)
        return trade.to_dict()

    def get_trades(self) -> list:
        """Get all trades"""
        trades = self.db.query(Trade).all()
        return [trade.to_dict() for trade in trades]

    def get_position(self) -> Optional[Dict[str, Any]]:
        """Get current trading position"""
        position = self.db.query(Position).first()
        if position:
            return position.to_dict()
        return None

    def update_position(self, position_data: Dict[str, Any]) -> Dict[str, Any]:
        """Update current trading position"""
        position = self.db.query(Position).first()
        if not position:
            position = Position(**position_data)
            self.db.add(position)
        else:
            position.symbol = position_data['symbol']
            position.quantity = position_data['quantity']
            position.entry_price = position_data['entry_price']
        self.db.commit()
        return position.to_dict()
