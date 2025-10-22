# 📅 Calendar Work Tracker - Complete Full-Stack Application

A modern, full-featured work tracking application built with React, TypeScript, Node.js, and MongoDB. Track goals, build streaks, stay focused with Pomodoro, and connect with friends!

## ✨ Features

### 🎯 Core Features
- **Goal Management** - Create, track, and complete daily, weekly, or one-time goals
- **Progress Calendar** - Visual representation of your work history and streaks
- **Smart Dashboard** - Overview of today's tasks, current streaks, and progress
- **Badge System** - Unlock achievements as you reach milestones
- **Daily Quotes** - Motivational quotes to kickstart your day

### 🍅 Pomodoro Timer (NEW!)
- **Focus Sessions** - 25-minute work intervals with 5-minute breaks
- **Customizable Durations** - Adjust work and break times to your preference
- **Visual Progress** - Circular progress indicator with time countdown
- **Goal Linking** - Link timer sessions to specific goals
- **Notifications** - Browser notifications when sessions complete
- **Session Tracking** - Track daily Pomodoro count and focus time

### 👥 Social Features (NEW!)
- **User Authentication** - Secure login and registration with JWT
- **Activity Feed** - See friends' achievements and milestones
- **Friend System** - Add, search, and connect with other users
- **Engagement** - Like and comment on friend activities
- **Friend Stats** - View friend progress, streaks, and goals
- **Privacy Controls** - Control what you share with others

### 🤖 AI Suggestions (Backend Ready)
- Pattern-based task recommendations
- Time-of-day optimization
- Streak protection alerts
- Effort balance suggestions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **React Router** - Client-side routing
- **React Query** - Server state management

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Secure authentication
- **bcrypt** - Password hashing

## 📂 Project Structure

```
calendar_work_tracker/
├── builder-hackathon-main/          # React Frontend
│   ├── client/
│   │   ├── components/             # UI components
│   │   │   ├── ui/                # shadcn/ui components
│   │   │   └── Layout.tsx         # App layout with navigation
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx      # Main dashboard
│   │   │   ├── Goals.tsx          # Goal management
│   │   │   ├── Calendar.tsx       # Progress calendar
│   │   │   ├── Pomodoro.tsx       # Focus timer (NEW!)
│   │   │   ├── Social.tsx         # Social features (NEW!)
│   │   │   └── HowItWorks.tsx     # User guide
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── lib/                   # Utility functions
│   │   └── App.tsx                # Main app component
│   ├── server/                     # Express backend
│   ├── shared/                     # Shared types
│   └── package.json
├── server.js                        # Standalone backend server
├── package.json                     # Backend dependencies
├── .env.example                     # Environment template
└── README.md

```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **MongoDB** ([Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** or **pnpm** (pnpm recommended)

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd calendar_work_tracker/builder-hackathon-main
```

2. **Install dependencies:**
```bash
npm install
# or
pnpm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/work_tracker
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/work_tracker

JWT_SECRET=your-super-secret-key-minimum-32-characters
PORT=3000
```

4. **Start MongoDB** (if using local installation):
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

5. **Start the development server:**
```bash
npm run dev
```

6. **Open your browser:**
```
http://localhost:5173
```

The backend API will run on `http://localhost:3000` (or your specified PORT).

## 📖 Usage Guide

### Dashboard
- View today's progress percentage
- Check your current streak
- See your best streak record
- Quick access to today's goals

### Goals Page
- Create new goals with title, description, effort level, and frequency
- Mark goals as complete
- Delete goals you no longer need
- View all your active goals

### Calendar
- Visualize your work history month by month
- See completion patterns and streaks
- Color-coded days (no activity, partial, full completion)
- Navigate between months

### Pomodoro Timer (NEW!)
- Click on "🍅 Pomodoro" in navigation
- Choose mode: Work (25min), Short Break (5min), or Long Break (15min)
- Optionally link to a specific goal
- Click Start to begin focus session
- Get notified when session completes
- Track daily Pomodoro sessions

### Social Features (NEW!)
- Click on "👥 Social" in navigation
- Login or register for an account
- View activity feed from friends
- Add friends by searching username/email
- Like and comment on activities
- View friend statistics and streaks

## 🔧 Configuration

### Customizing the App

**Colors & Theme:**
Edit `builder-hackathon-main/tailwind.config.ts` for custom colors.

**Pomodoro Durations:**
Edit `builder-hackathon-main/client/pages/Pomodoro.tsx`:
```typescript
const durations = {
  work: 25 * 60,        // Change work duration
  shortBreak: 5 * 60,   // Change short break
  longBreak: 15 * 60,   // Change long break
};
```

**Navigation:**
Edit `builder-hackathon-main/client/components/Layout.tsx` to add/remove pages.

## 📡 API Endpoints

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
```

### Goals
```http
GET    /api/goals
POST   /api/goals
PUT    /api/goals/:id
DELETE /api/goals/:id
```

### Social
```http
GET    /api/social/feed
GET    /api/social/friends
POST   /api/social/friends/:userId
DELETE /api/social/friends/:userId
GET    /api/social/users/search?query=
POST   /api/social/activities/:id/like
POST   /api/social/activities/:id/comment
```

### AI Suggestions
```http
GET /api/ai/suggestions
```

## 🧪 Development

### Run Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Type Checking
```bash
npm run typecheck
```

### Code Formatting
```bash
npm run format.fix
```

## 🚢 Deployment

### Deploy Frontend (Netlify/Vercel)

**Netlify:**
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist/spa`

**Vercel:**
```bash
npm install -g vercel
vercel
```

### Deploy Backend (Heroku/Railway)

**Heroku:**
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your-atlas-uri
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

**Railway:**
1. Connect GitHub repository
2. Add MongoDB plugin
3. Set environment variables
4. Auto-deploy on push

## 🐛 Troubleshooting

**MongoDB Connection Failed:**
- Verify MongoDB is running: `mongod --version`
- Check connection string in `.env`
- For Atlas, whitelist your IP

**Port Already in Use:**
```bash
# Find process
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Change port in .env
PORT=3001
```

**Browser Notifications Not Working:**
- Grant permissions in browser settings
- Requires HTTPS in production

**TypeScript Errors:**
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` configuration

## 🎨 Screenshots

*(Add screenshots of your app here)*

## 🗺️ Roadmap

- [x] Core goal tracking
- [x] Calendar visualization
- [x] Badge system
- [x] Pomodoro timer
- [x] Social features
- [ ] Mobile apps (iOS/Android)
- [ ] Advanced analytics dashboard
- [ ] Calendar integrations
- [ ] Team workspaces
- [ ] Gamification expansion

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Created as part of the Work Tracker initiative to help people bridge the intention-action gap.

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful components
- **Quotable API** for motivational quotes
- **Tailwind CSS** for styling
- **React** and **Vite** communities
- **Pomodoro Technique** by Francesco Cirillo

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the documentation
- Review the SETUP_GUIDE.md

---

**Start tracking your work and achieving your goals today!** 🚀

### Quick Commands

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Maintenance
npm test             # Run tests
npm run typecheck    # Check types
npm run format.fix   # Format code
```

**Happy tracking!** 🎯✨
