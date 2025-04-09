import logging
from datetime import datetime
import json
from typing import Dict, Any, Optional
from database import Database, get_db
from sqlalchemy.orm import Session

# Initialize logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class TradingBot:
    def __init__(self, db_session: Optional[Session] = None):
        self.logger = logger
        self.db_session = db_session
        self.db = None
        self.current_position = None
        
    def initialize(self):
        """Initialize the bot with basic settings"""
        self.logger.info("Initializing trading bot")
        if not self.db:
            self.db = Database(self.db_session)
        
        # Check if there's an existing position
        self.current_position = self.db.get_position()
        if not self.current_position:
            # Initialize with default values that satisfy the constraints
            position_data = {
                "symbol": "NONE",
                "quantity": 0.0,
                "entry_price": 0.0,
                "entry_time": datetime.utcnow()
            }
            self.current_position = self.db.update_position(position_data)
        
    def get_status(self) -> Dict[str, Any]:
        """Get current bot status"""
        if not self.db:
            self.db = Database(self.db_session)
        return {
            "status": "active",
            "current_position": self.current_position,
            "trading_history": self.db.get_trades()
        }
    
    def place_order(self, symbol: str, quantity: float, price: float, order_type: str = "buy") -> Dict[str, Any]:
        """Place a new order"""
        if not self.db:
            self.db = Database(self.db_session)
        
        self.logger.info(f"Placing {order_type} order for {symbol} - Quantity: {quantity} at Price: {price}")
        
        # Add trade to database
        trade_data = {
            'symbol': symbol,
            'quantity': quantity,
            'price': price,
            'type': order_type
        }
        trade = self.db.add_trade(trade_data)
        
        # Update position if it's a buy order
        if order_type == "buy":
            position_data = {
                'symbol': symbol,
                'quantity': quantity,
                'entry_price': price,
                'entry_time': datetime.utcnow()
            }
            self.current_position = self.db.update_position(position_data)
        
        return trade
    
    def get_trading_history(self) -> list:
        """Get complete trading history"""
        if not self.db:
            self.db = Database(self.db_session)
        return self.db.get_trades()
    
    def get_current_position(self) -> Dict[str, Any]:
        """Get current trading position"""
        if not self.db:
            self.db = Database(self.db_session)
        return self.current_position

# Export the bot instance for API access
def get_bot(db_session: Optional[Session] = None):
    return TradingBot(db_session)

# Initialize the bot
bot = get_bot()
