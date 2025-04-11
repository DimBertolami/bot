#!/bin/bash

# Set project root directory
PROJECT_ROOT="/home/dim/git/bot"

# Verify working directory exists
if [ ! -d "$PROJECT_ROOT" ]; then
  echo "Error: Project directory $PROJECT_ROOT does not exist"
  exit 1
fi

cd "$PROJECT_ROOT" || {
  echo "Error: Failed to enter project directory $PROJECT_ROOT"
  exit 1
}

# Verify Node.js version
REQUIRED_NODE=16
CURRENT_NODE=$(node -v | cut -d'.' -f1 | tr -d 'v')
if [ "$CURRENT_NODE" -lt "$REQUIRED_NODE" ]; then
  echo "Error: Node.js $REQUIRED_NODE or higher required (found v$CURRENT_NODE)"
  exit 1
fi

# Clean install dependencies
echo "Installing dependencies..."
rm -rf node_modules package-lock.json
npm install

# Function to check port availability
check_port() {
  if ! command -v lsof &> /dev/null; then
    echo "Warning: lsof not found, assuming port $1 is available"
    return 0
  fi
  if lsof -i :$1 > /dev/null 2>&1; then
    echo "Port $1 is in use"
    return 1
  else
    echo "Port $1 is available"
    return 0
  fi
}

# Try default ports
PORT=3000
if check_port $PORT; then
  echo "Starting dev server on port $PORT"
  npm run dev -- --port $PORT
else
  # Fallback to Vite default port
  PORT=5173
  if check_port $PORT; then
    echo "Starting dev server on fallback port $PORT"
    npm run dev -- --port $PORT
  else
    echo "Error: Both ports 3000 and 5173 are in use"
    exit 1
  fi
fi
