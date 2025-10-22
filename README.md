# Calendar Work Tracker – Bridging the Intention–Action Gap

A web-based productivity and motivation tracker that helps users convert their goals into consistent actions using motivation, gamification, and behavioral design techniques.

## 📁 Project Structure

```
calender_streak_tracker/
├── backend_work_tracker/        # Backend API (Node.js + MongoDB)
│   ├── server.js               # Express server with all endpoints
│   ├── package.json            # Backend dependencies
│   └── node_modules/           # Backend packages
├── builder-hackathon-main/      # Frontend React App
│   ├── client/                 # React source code
│   ├── server/                 # Embedded Vite server
│   └── package.json            # Frontend dependencies
└── README.md                   # This file
```

## 🎯 Problem Statement

Many individuals and teams know what tasks they need to do but struggle to start or stay consistent. Despite using digital planners or to-do lists, procrastination, low motivation, and lack of visibility often prevent users from turning intentions into action.

## 🚀 Features

### Core MVP Features

1. **✨ Daily Motivational Quote**
   - Kickstarts the user's day with an inspiring message
   - Fetches quotes from Quotable API
   - Refresh button for new quotes

2. **📝 Flexible Goal Setting**
   - Add one-time or recurring goals
   - Effort estimation (Low, Medium, High)
   - Goal types: Daily, Weekly, One-time

3. **🔥 Streak Tracker & Badges**
   - Track consecutive days of goal completion
   - 12 unique badges to unlock
   - Visual progress indicators

4. **📅 Progress Calendar**
   - Visual representation of completion history
   - Color-coded activity levels
   - Monthly view with navigation

5. **👋 Simple Onboarding**
   - 4-step introduction for new users
   - Clear feature explanations

### 🍅 Pomodoro Focus Timer (NEW!)

**Boost productivity with built-in focus sessions:**
- 25-minute work sessions with 5-minute breaks
- Customizable timer durations
- Visual progress circle
- Link timer sessions to specific goals
- Auto-start breaks option
- Browser notifications when sessions complete
- Track daily Pomodoro sessions
- Sound notifications
- Floating timer button for quick access

**Features:**
- Work mode (default 25 min)
- Short break (default 5 min)
- Long break (default 15 min)
- Session counter
- Goal linking for focused work
- Minimizable timer interface

### 🤝 Social Features (NEW!)

**Connect with friends and stay accountable:**

**Authentication:**
- User registration and login
- JWT-based secure authentication
- Offline mode option

**Social Feed:**
- See friends' achievements and progress
- Real-time activity updates
- Like and comment on achievements
- Activity types: goal completions, streaks, badges

**Friend System:**
- Search and add friends
- View friend statistics
- Remove friends
- Privacy settings

**Accountability:**
- Share your progress (optional)
- View friends' current streaks
- See badge collections
- Celebrate milestones together

### 🤖 AI Task Suggestions (NEW!)

**Smart recommendations based on your patterns:**

**Pattern Analysis:**
- Analyzes completion history
- Identifies productivity patterns
- Suggests optimal task timing

**Time-Based Suggestions:**
- Morning momentum tasks (before noon)
- Peak performance challenges (afternoon)
- Evening wind-down activities

**Smart Recommendations:**
- Break procrastination loops
- Balance effort distribution
- Maintain streak motivation
- Challenge yourself appropriately

**Features:**
- Context-aware task suggestions
- Priority indicators
- Effort-based recommendations
- Streak protection alerts

### 🗄️ Backend Integration (NEW!)

**Full-stack application with cloud sync:**

**Backend Stack:**
- Node.js + Express server
- MongoDB database
- RESTful API architecture
- JWT authentication

**Data Synchronization:**
- Cloud storage of goals and progress
- Real-time sync across devices
- Backup and restore
- Offline-first with sync

**API Endpoints:**
- User authentication
- Goal CRUD operations
- Streak data management
- Badge tracking
- Social features
- AI suggestions

**Database Schema:**
- Users collection
- Goals collection
- Streaks collection
- Badges collection
- Social activities collection

### Badge System

Unlock achievements by completing challenges:
- 🎯 Getting Started - Complete your first goal
- 🔥 3-Day Streak - Maintain a 3-day streak
- ⭐ Week Warrior - Maintain a 7-day streak
- 👑 Monthly Master - Maintain a 30-day streak
- 🌟 Yearly Master - Maintain a 365-day streak
- 💪 Dedicated Doer - Complete 10 goals
- 🏆 Achievement Hunter - Complete 50 goals
- 💎 Century Club - Complete 100 goals
- ✨ Perfect Day - Complete all goals in a day
- 🌅 Early Bird - Complete a goal before 9 AM
- 🦉 Night Owl - Complete a goal after 9 PM
- 📈 Consistency King - Complete goals for 5 consecutive days
- 🎖️ Challenge Accepted - Complete 5 high-effort goals

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern design with Grid, Flexbox, and animations
- **Vanilla JavaScript (ES6+)** - No framework dependencies
- **Web Audio API** - Pomodoro timer sounds
- **Notification API** - Browser notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication
- **bcrypt** - Password hashing

### APIs & Integrations
- **Quotable API** - Daily motivational quotes
- **RESTful API** - Custom backend endpoints

### Storage
- **LocalStorage** - Client-side offline persistence
- **MongoDB** - Cloud database with sync

## 📁 Project Structure

```
calendar_work_tracker/
├── index.html              # Main HTML file
├── server.js              # Express backend server
├── package.json           # Node dependencies
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore file
├── styles/
│   └── main.css          # Complete styling (includes Pomodoro & Social)
├── js/
│   ├── app.js            # Core application logic
│   ├── calendar.js       # Calendar functionality
│   ├── badges.js         # Badge/achievement system
│   ├── pomodoro.js       # Pomodoro timer (NEW!)
│   └── social.js         # Social features & API integration (NEW!)
├── assets/               # Images and icons
└── README.md            # Documentation
```

## 🚀 Getting Started

### Prerequisites

**Frontend Only (Offline Mode):**
- A modern web browser (Chrome, Firefox, Safari, or Edge)

**Full Stack (With Backend):**
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

#### Option 1: Frontend Only (Quick Start)

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Click "Continue Offline" when prompted
4. Start tracking your goals!

#### Option 2: Full Stack Setup (Recommended)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd calendar_work_tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   ```
   MONGODB_URI=mongodb://localhost:27017/work_tracker
   JWT_SECRET=your-super-secret-key
   PORT=3000
   ```

4. **Start MongoDB:**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env with your connection string
   ```

5. **Start the backend server:**
   ```bash
   cd backend_work_tracker
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

6. **Start the frontend (in a separate terminal):**
   ```bash
   cd builder-hackathon-main
   npm install
   npm run dev
   ```

7. **Open the app:**
   - Frontend: `http://localhost:8080`
   - Backend API: `http://localhost:3000`

### Usage

1. **First Time Setup**
   - Complete the onboarding tutorial
   - Register an account (optional, for sync & social features)
   - Set your first goal

2. **Daily Routine**
   - Read your daily motivational quote
   - Add goals for the day
   - Use Pomodoro timer for focused work sessions
   - Check off goals as you complete them
   - Track your streak and unlock badges

3. **Focus Sessions**
   - Click the 🍅 Focus Timer button
   - Select work mode or break mode
   - Link a timer session to a specific goal (optional)
   - Start the timer and focus!

4. **Social Features** (requires login)
   - Add friends to see their progress
   - Like and comment on achievements
   - View your social feed
   - Get motivated by your network

5. **AI Suggestions**
   - Click "AI Suggestions" to get smart task recommendations
   - Based on your time of day and completion patterns
   - Helps break procrastination and maintain balance

6. **Progress Tracking**
   - View your calendar to see completion patterns
   - Navigate between months to review history
   - Unlock badges for achievements

## 💾 Data Storage

**Offline Mode (LocalStorage):**
- Goals and completion status
- Streak data
- Badge unlock status
- Onboarding completion
- Pomodoro sessions
- Timer settings

**Online Mode (MongoDB + LocalStorage):**
- All data synced to cloud database
- Cross-device synchronization
- Backup and restore capability
- Social activities and friendships
- Offline-first architecture (works without internet, syncs when connected)

**Note**: Clearing browser data will reset offline data. Use online mode for persistent storage.

## 🔐 Security

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Environment Variables**: Sensitive data in .env
- **CORS Protection**: Configured for security
- **Input Validation**: Server-side validation
- **Privacy Controls**: User-controlled sharing settings

## 📊 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
Body: { username, email, password }
Response: { token, user }

POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

### Goal Endpoints

```http
GET /api/goals
Headers: Authorization: Bearer <token>
Response: [goals]

POST /api/goals
Headers: Authorization: Bearer <token>
Body: { title, type, effort }
Response: goal

PUT /api/goals/:id
Headers: Authorization: Bearer <token>
Body: { completed, ... }
Response: goal

DELETE /api/goals/:id
Headers: Authorization: Bearer <token>
Response: { message }
```

### Social Endpoints

```http
GET /api/social/feed
Headers: Authorization: Bearer <token>
Response: [activities]

GET /api/social/friends
Headers: Authorization: Bearer <token>
Response: [friends]

POST /api/social/friends/:userId
Headers: Authorization: Bearer <token>
Response: { message }

GET /api/social/users/search?query=
Headers: Authorization: Bearer <token>
Response: [users]
```

### AI Suggestions

```http
GET /api/ai/suggestions
Headers: Authorization: Bearer <token>
Response: { suggestions }
```

## 🔮 Future Enhancements

### Completed Features ✅
- ✅ Backend integration (Node.js + MongoDB)
- ✅ AI task suggestions
- ✅ Pomodoro timer
- ✅ Social features

### Upcoming Features (Roadmap)
### Upcoming Features (Roadmap)

1. **Mood & Motivation Check-in**
   - Daily emotional tracking
   - Personalized messages based on mood
   - Mood-based task recommendations

2. **Advanced AI Features**
   - Machine learning for pattern detection
   - Personalized productivity insights
   - Predictive task scheduling

3. **Enhanced Analytics Dashboard**
   - Detailed productivity metrics
   - Heatmaps and charts
   - Time-of-day performance analysis
   - Weekly/monthly reports

4. **Collaborative Features**
   - Team workspaces
   - Shared goals
   - Group challenges
   - Leaderboards

5. **Mobile Applications**
   - Native iOS app
   - Native Android app
   - Push notifications
   - Widget support

6. **Integrations**
   - Google Calendar sync
   - Todoist integration
   - Notion integration
   - Slack notifications

7. **Advanced Pomodoro**
   - Custom session lengths per goal
   - Break suggestions based on focus level
   - Music/ambient sound player
   - Distraction tracking

8. **Gamification Expansion**
   - More badge types
   - Achievement levels
   - XP and leveling system
   - Rewards marketplace

## 🎨 Design Philosophy

The app uses behavioral design principles:
- **Visual Feedback**: Immediate visual confirmation of actions
- **Gamification**: Streaks and badges encourage consistency  
- **Motivation**: Daily quotes and AI suggestions combat low energy
- **Simplicity**: Clean interface reduces decision fatigue
- **Progress Visibility**: Calendar shows journey at a glance
- **Social Proof**: Friends' achievements inspire action
- **Time Boxing**: Pomodoro technique for focused work
- **Smart Nudges**: AI-powered recommendations at the right time

## � Testing

To test the backend API:

```bash
# Install a REST client like Postman or use curl

# Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Use the returned token for authenticated requests
```

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP address

**Port Already in Use:**
- Change PORT in `.env` file
- Kill process using port: `npx kill-port 3000`

**Browser Notifications Not Working:**
- Grant notification permissions in browser settings
- Check if notifications are enabled in timer settings

**Offline Mode:**
- App works without backend server
- Click "Continue Offline" on login modal
- Data stored locally in browser

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as part of the Work Tracker initiative to help people bridge the intention-action gap.

## 🙏 Acknowledgments

- **Quotable API** for motivational quotes
- **MongoDB** for database services
- **Express.js** community for excellent documentation
- **Modern CSS** techniques for responsive design
- **Behavioral psychology** principles for feature design
- **Pomodoro Technique** by Francesco Cirillo
- The productivity community for inspiration

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review API documentation above

## 🌟 Show Your Support

If this project helps you stay productive:
- ⭐ Star the repository
- 🍴 Fork it for your own use
- 📢 Share it with others
- 🤝 Contribute improvements

---

**Start bridging your intention-action gap today!** 🚀

### Quick Start Commands

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

**Frontend-only mode:** Just open `index.html` in your browser!

**Full-stack mode:** Run backend server and access via `http://localhost:3000`
