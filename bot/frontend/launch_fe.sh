#!/bin/bash

# Frontend launch script for Crypto Trading Bot

# Color codes for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Move to frontend directory
FRONTEND_DIR="/opt/lampp/htdocs/bot/frontend"
cd "$FRONTEND_DIR"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "\n${YELLOW}Installing frontend dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ Failed to install frontend dependencies${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Frontend dependencies installed successfully${NC}"
fi

# Start the frontend development server
echo -e "\n${YELLOW}Starting frontend development server...${NC}"
npm run dev

exit 0
