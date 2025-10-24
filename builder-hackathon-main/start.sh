#!/bin/bash

echo "================================"
echo "Work Tracker - Quick Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    echo ""
    exit 1
fi

echo "[OK] Node.js is installed"
node --version
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm is not installed!"
    exit 1
fi

echo "[OK] npm is installed"
npm --version
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "[INFO] Installing dependencies..."
    echo "This may take a few minutes..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo "[ERROR] Failed to install dependencies!"
        echo "Try running: npm cache clean --force"
        echo "Then run this script again."
        exit 1
    fi
    echo ""
    echo "[OK] Dependencies installed successfully!"
else
    echo "[OK] Dependencies already installed"
fi

echo ""
echo "================================"
echo "Starting Development Server..."
echo "================================"
echo ""
echo "The app will be available at:"
echo "  Local:   http://localhost:8080"
echo "  Network: http://[your-ip]:8080"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "================================"
echo ""

# Start the development server
npm run dev
