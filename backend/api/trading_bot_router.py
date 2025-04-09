from fastapi import APIRouter, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from database import get_db
from models.trade import Trade, Position
from trading_bot import get_bot
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

router = APIRouter()

class OrderRequest(BaseModel):
    symbol: str
    quantity: float
    price: float
    order_type: str = "buy"

class StatusResponse(BaseModel):
    timestamp: str
    services: dict
    logs: dict

class ServiceStatus(BaseModel):
    name: str
    status: str
    pid: Optional[int] = None
    trading_active: Optional[bool] = False
    managed_by_systemd: Optional[bool] = False

class LogStatus(BaseModel):
    path: str
    last_modified: str

@router.get("/status", response_model=StatusResponse)
async def get_status(db: Session = Depends(get_db)):
    """Get the current status of the trading bot"""
    bot = get_bot(db)
    bot.initialize()
    
    # Get current status
    status_data = bot.get_status()
    
    # Format the response to match frontend expectations
    response = {
        "timestamp": datetime.now().isoformat(),
        "services": {
            "systemd": {
                "name": "System Daemon",
                "status": "active",
                "managed_by_systemd": True
            },
            "backend": {
                "name": "Trading Engine",
                "status": "active",
                "pid": None  # We don't have PID tracking yet
            },
            "signals": {
                "name": "Signal Generator",
                "status": "active"
            },
            "paper_trading": {
                "name": "Paper Trading",
                "status": "active",
                "trading_active": status_data.get("current_position", {}).get("quantity", 0) > 0
            },
            "database": {
                "name": "Database",
                "status": "active"
            },
            "frontend": {
                "name": "Web Interface",
                "status": "active"
            }
        },
        "logs": {
            "backend": {
                "path": "/opt/lampp/htdocs/backend/logs/backend.log",
                "last_modified": datetime.now().isoformat()
            },
            "signals": {
                "path": "/opt/lampp/htdocs/backend/logs/signals.log",
                "last_modified": datetime.now().isoformat()
            },
            "paper_trading": {
                "path": "/opt/lampp/htdocs/backend/logs/paper_trading.log",
                "last_modified": datetime.now().isoformat()
            }
        }
    }
    return response

@router.post("/order", response_model=dict)
async def place_order(request: Request, db: Session = Depends(get_db)):
    """Place a new order"""
    try:
        data = await request.json()
        symbol = data.get("symbol")
        quantity = data.get("quantity")
        price = data.get("price")
        order_type = data.get("order_type", "buy")
        
        if not all([symbol, quantity, price]):
            raise HTTPException(status_code=400, detail="Missing required parameters")
            
        # Create bot instance with current database session
        bot = get_bot(db)
        bot.initialize()
        
        # Place order through bot
        bot_order = bot.place_order(
            symbol,
            float(quantity),
            float(price),
            order_type
        )
        
        return {"success": True, "order": bot_order}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history", response_model=dict)
async def get_trading_history(db: Session = Depends(get_db)):
    """Get trading history"""
    bot = get_bot(db)
    bot.initialize()
    trades = bot.get_trading_history()
    return {"history": trades}

@router.get("/position", response_model=dict)
async def get_current_position(db: Session = Depends(get_db)):
    """Get current trading position"""
    bot = get_bot(db)
    bot.initialize()
    position = bot.get_current_position()
    return {"position": position}

@router.get("/signals/status", response_model=dict)
async def get_signals_status():
    """Get signals service status"""
    return {
        "status": "active",
        "timestamp": datetime.now().isoformat()
    }

@router.get("/paper-trading/status", response_model=dict)
async def get_paper_trading_status(db: Session = Depends(get_db)):
    """Get paper trading service status"""
    bot = get_bot(db)
    bot.initialize()
    position = bot.get_current_position()
    return {
        "status": "active",
        "trading_active": position.get("quantity", 0) > 0,
        "timestamp": datetime.now().isoformat()
    }

@router.get("/database/status", response_model=dict)
async def get_database_status(db: Session = Depends(get_db)):
    """Get database service status"""
    try:
        test_query = db.query(Trade).first()
        return {
            "status": "active",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
