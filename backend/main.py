from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from api.trading_bot_router import router as trading_bot_router
from api.historicaldata import router as historicaldata_router
import uvicorn

app = FastAPI(title="Crypto Trading Bot API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with proper prefixes
app.include_router(trading_bot_router, prefix="/api")
app.include_router(historicaldata_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
