# 🚀 Setup Guide for Local Hosting

This guide will help you set up and run the Work Tracker application on any system.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **pnpm** (recommended)
- **Git** (optional, for cloning)

## Step-by-Step Setup

### 1. Navigate to Project Directory

```bash
cd builder-hackathon-main
```

### 2. Install Dependencies

Choose one of the following package managers:

**Using npm:**
```bash
npm install
```

**Using pnpm (recommended for faster installation):**
```bash
pnpm install
```

**Using yarn:**
```bash
yarn install
```

### 3. Create Environment File (Optional)

Create a `.env` file in the root directory if you need custom configuration:

```bash
# .env
PORT=8080
NODE_ENV=development
```

### 4. Start Development Server

```bash
npm run dev
```

Or with pnpm:
```bash
pnpm dev
```

The application should now be running at:
- **Local**: http://localhost:8080
- **Network**: http://[your-ip]:8080

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```

## 🔧 Troubleshooting

### Issue 1: "Cannot find module" errors

**Solution:** Delete `node_modules` and reinstall
```bash
# On Windows PowerShell
Remove-Item -Recurse -Force node_modules
npm install

# On Linux/Mac
rm -rf node_modules
npm install
```

### Issue 2: Port 8080 is already in use

**Solution 1:** Kill the process using port 8080
```bash
# On Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process

# On Linux/Mac
lsof -ti:8080 | xargs kill
```

**Solution 2:** Change the port in `vite.config.ts`:
```typescript
server: {
  host: "::",
  port: 3000, // Change to any available port
  // ...
}
```

### Issue 3: "EACCES" permission error

**Solution:** Run without sudo (don't use sudo with npm):
```bash
npm install
```

If on Linux/Mac, fix npm permissions:
```bash
sudo chown -R $USER:$(id -gn $USER) ~/.npm
```

### Issue 4: Dependencies fail to install

**Solution:** Clear npm cache and reinstall
```bash
npm cache clean --force
npm install
```

### Issue 5: TypeScript errors

**Solution:** Ensure TypeScript is installed correctly
```bash
npm install -D typescript
npm run typecheck
```

### Issue 6: Vite build errors

**Solution:** Clear Vite cache and restart
```bash
# On Windows PowerShell
Remove-Item -Recurse -Force node_modules/.vite

# On Linux/Mac
rm -rf node_modules/.vite

# Then restart
npm run dev
```

### Issue 7: Can't access from another device on network

**Solution:** The server is already configured to accept connections from network.
- Check your firewall settings
- Make sure both devices are on the same network
- Use your computer's IP address: `http://[YOUR_IP]:8080`

To find your IP address:
```bash
# On Windows PowerShell
ipconfig

# On Linux/Mac
ifconfig
```

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

This will:
1. Build the client (React app) → `dist/spa/`
2. Build the server (Express API) → `dist/server/`

To start the production server:

```bash
npm start
```

## 🌐 Network Access

The app is configured to accept connections from any network interface (`host: "::"`).

To access from another device:
1. Find your computer's IP address
2. On the other device, open: `http://[YOUR_IP]:8080`

Example: `http://192.168.1.100:8080`

## 📁 Project Structure

```
builder-hackathon-main/
├── client/           # React frontend source
├── server/           # Express backend source
├── shared/           # Shared types and utilities
├── dist/             # Built files (after npm run build)
├── package.json      # Dependencies and scripts
├── vite.config.ts    # Vite configuration
└── tsconfig.json     # TypeScript configuration
```

## 🔑 Demo Credentials

For testing the authentication features:
- **Email:** admin@1234
- **Password:** 1234

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run typecheck` - Check TypeScript types
- `npm test` - Run tests

## ⚙️ Configuration Files

### vite.config.ts
Main development server configuration:
- Port: 8080
- Host: "::" (accepts all connections)
- Aliases: `@` → `./client`, `@shared` → `./shared`

### package.json
- Scripts for dev, build, and start
- All project dependencies
- Node.js and npm version requirements

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. **Check Node.js version:**
   ```bash
   node --version
   ```
   Should be v18.0.0 or higher

2. **Check npm version:**
   ```bash
   npm --version
   ```
   Should be v9.0.0 or higher

3. **Verify all files are present:**
   - package.json
   - vite.config.ts
   - client/ directory
   - server/ directory
   - shared/ directory

4. **Check for error messages:**
   Look at the terminal output for specific error messages and search for solutions

5. **Try a fresh install:**
   ```bash
   # Delete everything except source files
   Remove-Item -Recurse -Force node_modules
   Remove-Item package-lock.json
   
   # Reinstall
   npm install
   npm run dev
   ```

## 💡 Tips for Sharing the Project

When sharing this project with others:

1. **Don't include node_modules/** - It's huge and not needed
2. **Don't include dist/** - Built files can be regenerated
3. **Include package.json** - Required for dependencies
4. **Include .gitignore** - To prevent committing large files

Share via:
- **ZIP file:** Exclude node_modules and dist folders
- **Git repository:** Push to GitHub/GitLab
- **Cloud storage:** Use .gitignore to exclude unnecessary files

## 📞 Support

If you encounter any issues not covered here, check:
- Terminal error messages for specific issues
- Browser console (F12) for frontend errors
- Network tab (F12) for API issues
