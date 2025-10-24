# 🚀 Quick Start Guide

## For the Person Receiving This Project

### Windows Users

1. **Double-click `start.bat`** - This will automatically:
   - Check if Node.js is installed
   - Install all dependencies
   - Start the development server

2. **Open your browser** and go to: `http://localhost:8080`

### Mac/Linux Users

1. **Make the script executable:**
   ```bash
   chmod +x start.sh
   ```

2. **Run the script:**
   ```bash
   ./start.sh
   ```

3. **Open your browser** and go to: `http://localhost:8080`

### If Scripts Don't Work

Run these commands manually:

```bash
npm install
npm run dev
```

Then open: `http://localhost:8080`

---

## Common Issues & Quick Fixes

### "Node.js is not installed"
→ Install Node.js from: https://nodejs.org/ (Download the LTS version)

### "Port 8080 is already in use"
→ Close other applications using port 8080, or change the port in `vite.config.ts`

### "Dependencies failed to install"
→ Run these commands:
```bash
npm cache clean --force
npm install
```

### "Can't access from another computer"
→ Find your IP address:
- **Windows:** Open Command Prompt and type `ipconfig`
- **Mac/Linux:** Open Terminal and type `ifconfig` or `ip addr`

Then access: `http://[YOUR_IP]:8080`

---

## Need More Help?

See the detailed **SETUP.md** file for comprehensive troubleshooting and configuration options.

---

## Demo Login

**Email:** admin@1234  
**Password:** 1234
