# Calendar Work Tracker - Backend API

This is the backend server for the Calendar Work Tracker application, built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)

### Installation & Setup

1. **Navigate to this directory:**
   ```bash
   cd backend_work_tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - Copy `.env.example` to `.env` (if not already present)
   - Update `MONGODB_URI` with your MongoDB connection string
   - Set `JWT_SECRET` for authentication

4. **Start the server:**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

The server will run on `http://localhost:3000`

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Goals Management
- `GET /api/goals` - Get all user goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal

### Social Features
- `GET /api/social/feed` - Get activity feed
- `POST /api/social/friends/request` - Send friend request
- `GET /api/social/friends` - Get friends list
- `POST /api/social/activities/:id/like` - Like activity
- `POST /api/social/activities/:id/comment` - Comment on activity

### AI & Other
- `POST /api/ai/suggestions` - Get AI task suggestions
- `GET /api/badges` - Get user badges
- `GET /api/streaks` - Get streak information

## 📊 Database Models

- **User** - User accounts with authentication
- **Goal** - User goals with type and completion tracking
- **Streak** - Streak tracking for goals
- **Badge** - Achievement badges
- **Activity** - Social activity feed items
- **FriendRequest** - Friend connection requests

## 🔧 Configuration

### Environment Variables (.env)
```env
MONGODB_URI=mongodb://localhost:27017/work_tracker
JWT_SECRET=your-secret-key-change-in-production
PORT=3000
```

## 🛠️ Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB is running: `mongod` (or check MongoDB service)
- Check connection string in `.env`
- For Atlas, whitelist your IP address

**Port Already in Use:**
```bash
# Windows
netstat -ano | findstr :3000
# Then kill the process or change PORT in .env
```

## 📝 Notes

- This backend is designed to work with the React frontend in `../builder-hackathon-main`
- JWT tokens are used for authentication
- All endpoints (except auth) require valid JWT token in Authorization header
