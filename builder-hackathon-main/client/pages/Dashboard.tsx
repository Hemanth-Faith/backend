import { Layout } from '@/components/Layout';
import { useWorkTrackerState } from '@/hooks/useWorkTrackerState';
import { getDailyQuote } from '@/lib/quotes';
import { getMoodBasedQuote, getMoodBasedTips } from '@/lib/moodQuotes';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from '@/components/LoginModal';
import { MoodTracker } from '@/components/MoodTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWorkMode } from '@/hooks/useWorkMode';

export default function Dashboard() {
  const { state, completeGoal } = useWorkTrackerState();
  const { isAuthenticated } = useAuth();
  const { emoji } = useWorkMode();
  const dailyQuote = getDailyQuote();
  const [completedToday, setCompletedToday] = useState<Set<string>>(new Set());
  const [loginOpen, setLoginOpen] = useState(false);
  const [currentMood, setCurrentMood] = useState<string | null>(null);

  useEffect(() => {
    // Load current mood from localStorage
    const mood = localStorage.getItem('currentMood');
    setCurrentMood(mood);
  }, []);

  const handleMoodSelect = (mood: string) => {
    setCurrentMood(mood);
  };

  const moodQuote = getMoodBasedQuote(currentMood);
  const moodTips = getMoodBasedTips(currentMood);
  const currentMoodEmoji = localStorage.getItem('currentMoodEmoji') || '😊';
  const currentMoodLabel = localStorage.getItem('currentMoodLabel') || 'Happy';

  const today = new Date().toISOString().split('T')[0];
  
  // Sort goals based on mood
  const todaysGoals = useMemo(() => {
    const effortOrder = { light: 1, medium: 2, heavy: 3 };
    const sortedGoals = [...state.goals];
    
    if (currentMood === 'happy' || currentMood === 'excited' || currentMood === 'energetic') {
      // Happy mood: heavy to light (tackle hard tasks first)
      sortedGoals.sort((a, b) => effortOrder[b.effort as keyof typeof effortOrder] - effortOrder[a.effort as keyof typeof effortOrder]);
    } else if (currentMood === 'sad' || currentMood === 'tired' || currentMood === 'stressed' || currentMood === 'anxious') {
      // Sad/low energy mood: light to heavy (ease into the day)
      sortedGoals.sort((a, b) => effortOrder[a.effort as keyof typeof effortOrder] - effortOrder[b.effort as keyof typeof effortOrder]);
    }
    // For neutral or other moods, keep original order
    
    return sortedGoals;
  }, [state.goals, currentMood]);

  // Initialize completedToday from actual completion data
  useEffect(() => {
    const completed = new Set(
      state.goals
        .filter(goal => goal.completedDates.includes(today))
        .map(goal => goal.id)
    );
    setCompletedToday(completed);
  }, [state.goals, today]);

  const handleCompleteGoal = (goalId: string) => {
    completeGoal(goalId);
    setCompletedToday(prev => new Set([...prev, goalId]));
  };

  const totalCompleted = completedToday.size;
  const completionPercentage = Math.round((totalCompleted / todaysGoals.length) * 100);

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'light':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'medium':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'heavy':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffortEmoji = (effort: string) => {
    switch (effort) {
      case 'light':
        return emoji('🟢');
      case 'medium':
        return emoji('🟡');
      case 'heavy':
        return emoji('🔴');
      default:
        return emoji('⚪');
    }
  };

  // Calculate overall statistics
  const stats = useMemo(() => {
    const totalGoals = state.goals.length;
    const totalCompletedToday = completedToday.size;
    const overallStreak = Math.max(...Object.values(state.streaks).map(s => s.currentStreak), 0);
    const bestStreak = Math.max(...Object.values(state.streaks).map(s => s.longestStreak), 0);
    
    return {
      totalGoals,
      totalCompletedToday,
      overallStreak,
      bestStreak,
      completionRate: totalGoals > 0 ? Math.round((totalCompletedToday / totalGoals) * 100) : 0
    };
  }, [state.goals, state.streaks, completedToday]);

  // If not authenticated, show motivational landing
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="space-y-8">
          {/* Hero Section with Gradient Animation */}
          <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-2xl border border-border p-12 text-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative z-10">
              {emoji('🚀') && <div className="mb-6 text-7xl animate-bounce">{emoji('🚀')}</div>}
              <h1 className="text-5xl font-bold text-foreground mb-4 animate-fade-in">
                Transform Your Dreams into Reality
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands who are crushing their goals daily. Track progress, build streaks, and achieve more than you ever thought possible.
              </p>
              <div className="flex gap-4 justify-center items-center flex-wrap">
                <Button size="lg" className="text-lg px-8 py-6" onClick={() => setLoginOpen(true)}>
                  {emoji('🔓 ')}Start Your Journey
                </Button>
                <p className="text-sm text-muted-foreground">
                  Already have an account? <button onClick={() => setLoginOpen(true)} className="text-primary hover:underline font-semibold">Sign in</button>
                </p>
              </div>
            </div>
          </section>

          {/* Motivational Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center transform hover:scale-105 transition-transform">
              <CardHeader>
                {emoji('💪') && <div className="text-5xl mb-2">{emoji('💪')}</div>}
                <CardTitle className="text-2xl">Build Discipline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create lasting habits that stick. Track your daily progress and watch your consistency grow.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transform hover:scale-105 transition-transform">
              <CardHeader>
                <div className="text-5xl mb-2">🔥</div>
                <CardTitle className="text-2xl">Ignite Your Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every day counts! Build unstoppable momentum with our visual streak tracking system.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transform hover:scale-105 transition-transform">
              <CardHeader>
                <div className="text-5xl mb-2">🏆</div>
                <CardTitle className="text-2xl">Achieve Greatness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Unlock achievements, compete with yourself, and become the person you aspire to be.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Feature Highlights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center">Why Track Your Work?</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📊</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Visual Progress Tracking</h3>
                  <p className="text-muted-foreground">See your daily, weekly, and monthly progress at a glance with beautiful visualizations.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-4xl">📅</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Interactive Calendar</h3>
                  <p className="text-muted-foreground">Track completion dates, build streaks, and schedule future goals with our sleek calendar.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-4xl">🍅</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Pomodoro Timer</h3>
                  <p className="text-muted-foreground">Stay focused with built-in Pomodoro technique support and productivity tracking.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-4xl">👥</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Social Motivation</h3>
                  <p className="text-muted-foreground">Connect with friends, share achievements, and stay motivated together.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Winning?</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Your journey to consistent success begins with a single login.
              </p>
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => setLoginOpen(true)}>
                🎯 Login & Start Tracking
              </Button>
            </CardContent>
          </Card>
        </div>

        <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      </Layout>
    );
  }

  // Authenticated Dashboard View
  return (
    <Layout>
      <MoodTracker onMoodSelect={handleMoodSelect} />
      
      <div className="space-y-8">
        {/* Mood-Based Motivational Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/90 dark:to-pink-950/90 rounded-xl border-2 border-purple-200 dark:border-purple-700 p-8">
          <div className="absolute inset-0 opacity-10">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${10 + i * 20}%`,
                  top: `${5 + i * 15}%`,
                  fontSize: '2.5rem',
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + i * 0.5}s`
                }}
              >
                ✨
              </div>
            ))}
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-5xl animate-bounce">{currentMoodEmoji}</div>
              <div className="text-sm font-semibold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200">
                {currentMoodLabel}
              </div>
            </div>
            <p className="text-xl font-semibold text-center text-foreground mb-3 italic">"{moodQuote.text}"</p>
            <p className="text-sm text-center text-muted-foreground mb-6">— {moodQuote.author}</p>
            
            {/* Mood-Based Tips */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              {moodTips.map((tip, i) => (
                <div key={i} className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-lg p-3 text-sm text-center">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Today's Progress Overview with Vibrant Animations */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="transform hover:scale-105 transition-all hover:shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
            <CardContent className="p-6">
              {emoji('📊') && <div className="text-5xl mb-3 animate-pulse">{emoji('📊')}</div>}
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Today's Progress</h3>
              <p className="text-5xl font-bold text-blue-600 dark:text-blue-400">{stats.completionRate}%</p>
              <p className="text-xs text-muted-foreground mt-2">{stats.totalCompletedToday} of {stats.totalGoals} goals</p>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 transition-all hover:shadow-xl bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-900 border-orange-200">
            <CardContent className="p-6">
              {emoji('🔥') && <div className="text-5xl mb-3 animate-pulse">{emoji('🔥')}</div>}
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Streak</h3>
              <p className="text-5xl font-bold text-orange-600 dark:text-orange-400">{stats.overallStreak}</p>
              <p className="text-xs text-muted-foreground mt-2">days in a row</p>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 transition-all hover:shadow-xl bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-950 dark:to-amber-900 border-yellow-200">
            <CardContent className="p-6">
              {emoji('🏆') && <div className="text-5xl mb-3 animate-pulse">{emoji('🏆')}</div>}
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Best Streak</h3>
              <p className="text-5xl font-bold text-yellow-600 dark:text-yellow-400">{stats.bestStreak}</p>
              <p className="text-xs text-muted-foreground mt-2">personal record</p>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 transition-all hover:shadow-xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 border-green-200">
            <CardContent className="p-6">
              {emoji('🎯') && <div className="text-5xl mb-3 animate-pulse">{emoji('🎯')}</div>}
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Goals</h3>
              <p className="text-5xl font-bold text-green-600 dark:text-green-400">{stats.totalGoals}</p>
              <p className="text-xs text-muted-foreground mt-2">active goals</p>
            </CardContent>
          </Card>
        </section>

        {/* Today's Goals with Enhanced Animations */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Today's Goals
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {currentMood === 'happy' || currentMood === 'excited' || currentMood === 'energetic' ? (
                  <>Keep the momentum going! Sorted by difficulty: hardest first. {emoji('🎯💪')}</>
                ) : currentMood === 'sad' || currentMood === 'tired' || currentMood === 'stressed' || currentMood === 'anxious' ? (
                  <>Taking it easy today. Sorted by difficulty: easiest first. {emoji('🎯✨')}</>
                ) : (
                  <>Keep the momentum going. Complete your goals for today. {emoji('🎯')}</>
                )}
              </p>
            </div>
            <Link to="/goals">
              <Button variant="default" size="lg" className="animate-pulse hover:animate-none">
                + Add Goal
              </Button>
            </Link>
          </div>

          {todaysGoals.length === 0 ? (
            <Card className="border-dashed border-2 hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center justify-center py-16">
                {emoji('📝') && <div className="text-7xl mb-6 animate-bounce">{emoji('📝')}</div>}
                <h3 className="text-2xl font-bold text-foreground mb-3">No goals yet</h3>
                <p className="text-muted-foreground text-center mb-8 max-w-md">
                  Create your first goal to start tracking your progress and building your success streak!
                </p>
                <Link to="/goals">
                  <Button size="lg" className="text-lg px-8 py-6">
                    🚀 Create Your First Goal
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-5">
              {todaysGoals.map((goal, index) => {
                const isCompleted = completedToday.has(goal.id);
                const streak = state.streaks[goal.id];

                return (
                  <Card
                    key={goal.id}
                    className={`transform hover:scale-102 transition-all duration-300 hover:shadow-xl ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-300 shadow-lg shadow-green-500/20' 
                        : 'hover:border-primary'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className={`text-xl font-bold text-foreground ${isCompleted ? 'line-through opacity-60' : ''}`}>
                              {goal.title}
                            </h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getEffortColor(goal.effort)}`}>
                              {getEffortEmoji(goal.effort)} {goal.effort}
                            </span>
                          </div>
                          {goal.description && (
                            <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                          )}
                          <div className="flex gap-6 text-sm">
                            <span className="flex items-center gap-1 font-medium text-orange-600 dark:text-orange-400">
                              🔥 <strong>{streak?.currentStreak || 0}</strong> day streak
                            </span>
                            <span className="flex items-center gap-1 font-medium text-yellow-600 dark:text-yellow-400">
                              🏆 <strong>{streak?.longestStreak || 0}</strong> best
                            </span>
                            <span className="flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400">
                              📅 {goal.frequency}
                            </span>
                          </div>
                        </div>
                        <div className="ml-6 flex items-center gap-3">
                          {!isCompleted && (
                            <Button
                              onClick={() => handleCompleteGoal(goal.id)}
                              variant="default"
                              size="lg"
                              className="whitespace-nowrap transform hover:scale-110 transition-transform"
                            >
                              ✓ Mark Complete
                            </Button>
                          )}
                          {isCompleted && (
                            <div className="flex flex-col items-center gap-2">
                              <div className="text-5xl animate-bounce">🎉</div>
                              <span className="text-xs font-semibold text-green-600 dark:text-green-400">Completed!</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
