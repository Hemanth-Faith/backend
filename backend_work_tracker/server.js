const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/work_tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    privacySettings: {
        shareProgress: { type: Boolean, default: false },
        showBadges: { type: Boolean, default: true }
    }
});

const User = mongoose.model('User', userSchema);

// Goal Schema
const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['daily', 'weekly', 'one-time'], required: true },
    effort: { type: String, enum: ['low', 'medium', 'high'], required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    category: String,
    tags: [String]
});

const Goal = mongoose.model('Goal', goalSchema);

// Streak Data Schema
const streakSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    completed: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }]
});

const Streak = mongoose.model('Streak', streakSchema);

// Badge Schema
const badgeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    badgeId: { type: String, required: true },
    unlocked: { type: Boolean, default: false },
    unlockedAt: { type: Date }
});

const Badge = mongoose.model('Badge', badgeSchema);

// Social Activity Schema
const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['goal_completed', 'streak_milestone', 'badge_unlocked'], required: true },
    content: { type: String, required: true },
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Activity = mongoose.model('Activity', activitySchema);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error during login' });
    }
});

// ==================== GOAL ROUTES ====================

// Get all goals for user
app.get('/api/goals', authenticateToken, async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching goals' });
    }
});

// Create goal
app.post('/api/goals', authenticateToken, async (req, res) => {
    try {
        const goal = new Goal({
            ...req.body,
            userId: req.user.userId
        });
        await goal.save();
        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({ error: 'Error creating goal' });
    }
});

// Update goal
app.put('/api/goals/:id', authenticateToken, async (req, res) => {
    try {
        const goal = await Goal.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            req.body,
            { new: true }
        );
        
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        // If goal completed, create activity
        if (req.body.completed && !goal.completed) {
            const activity = new Activity({
                userId: req.user.userId,
                type: 'goal_completed',
                content: `completed "${goal.title}"`,
                goalId: goal._id
            });
            await activity.save();
        }

        res.json(goal);
    } catch (error) {
        res.status(500).json({ error: 'Error updating goal' });
    }
});

// Delete goal
app.delete('/api/goals/:id', authenticateToken, async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }
        res.json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting goal' });
    }
});

// ==================== AI TASK SUGGESTIONS ====================

app.get('/api/ai/suggestions', authenticateToken, async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user.userId });
        const streaks = await Streak.find({ userId: req.user.userId }).sort({ date: -1 }).limit(30);

        // Analyze patterns
        const suggestions = generateTaskSuggestions(goals, streaks);

        res.json({ suggestions });
    } catch (error) {
        res.status(500).json({ error: 'Error generating suggestions' });
    }
});

function generateTaskSuggestions(goals, streaks) {
    const suggestions = [];
    const now = new Date();
    const hour = now.getHours();

    // Pattern analysis
    const completedGoals = goals.filter(g => g.completed);
    const effortDistribution = {
        low: completedGoals.filter(g => g.effort === 'low').length,
        medium: completedGoals.filter(g => g.effort === 'medium').length,
        high: completedGoals.filter(g => g.effort === 'high').length
    };

    // Time-based suggestions
    if (hour < 12) {
        suggestions.push({
            type: 'morning',
            title: 'Start with a quick win',
            description: 'Complete a low-effort task to build momentum',
            suggestedEffort: 'low'
        });
    } else if (hour < 17) {
        suggestions.push({
            type: 'afternoon',
            title: 'Tackle a challenging task',
            description: 'Your peak productivity hours - perfect for high-effort tasks',
            suggestedEffort: 'high'
        });
    } else {
        suggestions.push({
            type: 'evening',
            title: 'Wind down with planning',
            description: 'Review today and plan tomorrow\'s goals',
            suggestedEffort: 'low'
        });
    }

    // Streak-based suggestions
    if (streaks.length > 0 && streaks[0].completed === 0) {
        suggestions.push({
            type: 'streak',
            title: 'Don\'t break your streak!',
            description: 'Complete at least one goal today to maintain your progress',
            priority: 'high'
        });
    }

    // Balance suggestions
    if (effortDistribution.low > effortDistribution.high * 2) {
        suggestions.push({
            type: 'balance',
            title: 'Challenge yourself',
            description: 'Try adding a high-effort goal to expand your capabilities',
            suggestedEffort: 'high'
        });
    }

    return suggestions;
}

// ==================== STREAK & BADGE ROUTES ====================

// Get streak data
app.get('/api/streaks', authenticateToken, async (req, res) => {
    try {
        const streaks = await Streak.find({ userId: req.user.userId }).sort({ date: -1 });
        res.json(streaks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching streaks' });
    }
});

// Update streak
app.post('/api/streaks', authenticateToken, async (req, res) => {
    try {
        const { date, completed, total } = req.body;
        
        let streak = await Streak.findOne({ userId: req.user.userId, date: new Date(date) });
        
        if (streak) {
            streak.completed = completed;
            streak.total = total;
        } else {
            streak = new Streak({
                userId: req.user.userId,
                date: new Date(date),
                completed,
                total
            });
        }
        
        await streak.save();
        res.json(streak);
    } catch (error) {
        res.status(500).json({ error: 'Error updating streak' });
    }
});

// Get badges
app.get('/api/badges', authenticateToken, async (req, res) => {
    try {
        const badges = await Badge.find({ userId: req.user.userId });
        res.json(badges);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching badges' });
    }
});

// Unlock badge
app.post('/api/badges', authenticateToken, async (req, res) => {
    try {
        const { badgeId } = req.body;
        
        let badge = await Badge.findOne({ userId: req.user.userId, badgeId });
        
        if (badge) {
            badge.unlocked = true;
            badge.unlockedAt = new Date();
        } else {
            badge = new Badge({
                userId: req.user.userId,
                badgeId,
                unlocked: true,
                unlockedAt: new Date()
            });
        }
        
        await badge.save();

        // Create activity
        const activity = new Activity({
            userId: req.user.userId,
            type: 'badge_unlocked',
            content: `unlocked the ${badgeId} badge`
        });
        await activity.save();

        res.json(badge);
    } catch (error) {
        res.status(500).json({ error: 'Error unlocking badge' });
    }
});

// ==================== SOCIAL FEATURES ====================

// Get activity feed
app.get('/api/social/feed', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const friendIds = [req.user.userId, ...user.friends];

        const activities = await Activity.find({ userId: { $in: friendIds } })
            .populate('userId', 'username')
            .sort({ createdAt: -1 })
            .limit(50);

        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching feed' });
    }
});

// Search users
app.get('/api/social/users/search', authenticateToken, async (req, res) => {
    try {
        const { query } = req.query;
        const users = await User.find({
            $and: [
                { _id: { $ne: req.user.userId } },
                {
                    $or: [
                        { username: { $regex: query, $options: 'i' } },
                        { email: { $regex: query, $options: 'i' } }
                    ]
                }
            ]
        }).select('username email').limit(20);

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error searching users' });
    }
});

// Add friend
app.post('/api/social/friends/:userId', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const friendId = req.params.userId;

        if (user.friends.includes(friendId)) {
            return res.status(400).json({ error: 'Already friends' });
        }

        user.friends.push(friendId);
        await user.save();

        res.json({ message: 'Friend added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding friend' });
    }
});

// Remove friend
app.delete('/api/social/friends/:userId', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        user.friends = user.friends.filter(id => id.toString() !== req.params.userId);
        await user.save();

        res.json({ message: 'Friend removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing friend' });
    }
});

// Get friends list
app.get('/api/social/friends', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('friends', 'username email');
        res.json(user.friends);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching friends' });
    }
});

// Like activity
app.post('/api/social/activities/:activityId/like', authenticateToken, async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.activityId);
        
        if (activity.likes.includes(req.user.userId)) {
            activity.likes = activity.likes.filter(id => id.toString() !== req.user.userId);
        } else {
            activity.likes.push(req.user.userId);
        }
        
        await activity.save();
        res.json(activity);
    } catch (error) {
        res.status(500).json({ error: 'Error liking activity' });
    }
});

// Comment on activity
app.post('/api/social/activities/:activityId/comment', authenticateToken, async (req, res) => {
    try {
        const { text } = req.body;
        const activity = await Activity.findById(req.params.activityId);
        
        activity.comments.push({
            userId: req.user.userId,
            text,
            createdAt: new Date()
        });
        
        await activity.save();
        res.json(activity);
    } catch (error) {
        res.status(500).json({ error: 'Error adding comment' });
    }
});

// Get user stats
app.get('/api/social/stats/:userId', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const goals = await Goal.find({ userId });
        const completedGoals = goals.filter(g => g.completed);
        const streaks = await Streak.find({ userId });
        const badges = await Badge.find({ userId, unlocked: true });

        // Calculate current streak
        let currentStreak = 0;
        const sortedStreaks = streaks.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        for (let i = 0; i < sortedStreaks.length; i++) {
            if (sortedStreaks[i].completed > 0) {
                currentStreak++;
            } else if (i > 0) {
                break;
            }
        }

        res.json({
            username: user.username,
            totalGoals: goals.length,
            completedGoals: completedGoals.length,
            currentStreak,
            totalBadges: badges.length,
            privacySettings: user.privacySettings
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stats' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
