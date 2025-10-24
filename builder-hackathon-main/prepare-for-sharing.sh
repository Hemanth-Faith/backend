#!/bin/bash

echo "========================================"
echo "Work Tracker - Prepare for Sharing"
echo "========================================"
echo ""
echo "This will clean up your project for sharing"
echo "by removing large folders that can be regenerated."
echo ""
read -p "Press Enter to continue..."
echo ""

# Remove node_modules
if [ -d "node_modules" ]; then
    echo "[1/3] Removing node_modules folder..."
    rm -rf node_modules
    echo "[OK] node_modules removed"
else
    echo "[SKIP] node_modules folder not found"
fi
echo ""

# Remove dist
if [ -d "dist" ]; then
    echo "[2/3] Removing dist folder..."
    rm -rf dist
    echo "[OK] dist removed"
else
    echo "[SKIP] dist folder not found"
fi
echo ""

# Remove .vite cache
if [ -d "node_modules/.vite" ]; then
    echo "[3/3] Removing Vite cache..."
    rm -rf "node_modules/.vite"
    echo "[OK] Vite cache removed"
else
    echo "[SKIP] Vite cache not found"
fi
echo ""

# Summary
echo "========================================"
echo "Project is ready to share!"
echo "========================================"
echo ""
echo "Removed folders:"
echo "  - node_modules/ (saves ~300MB)"
echo "  - dist/ (saves ~20MB)"
echo "  - .vite/ cache"
echo ""
echo "The recipient will run './start.sh' to:"
echo "  1. Install dependencies"
echo "  2. Start the server"
echo ""
echo "Next steps:"
echo "  1. ZIP this folder"
echo "  2. Share via email/cloud storage"
echo "  3. Or push to GitHub/GitLab"
echo ""
echo "See SHARING.md for detailed instructions"
echo ""
